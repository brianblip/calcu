import "./App.css";
import { useState } from "react";
import * as math from "mathjs";

function App() {
	// State to hold the displayed text
	const [displayText, setDisplayText] = useState("0");

	// Function to handle button clicks
	const handleButtonClick = (value) => {
		if (value === "DEL") {
			// Delete last character
			setDisplayText(displayText.slice(0, -1));
		} else if (value === "RESET") {
			// Reset the display
			setDisplayText("0");
		} else if (value === "=") {
			try {
				// Remove commas, evaluate the expression, and add commas back
				const expressionWithoutCommas = displayText.replace(/,/g, "");
				const result = math.evaluate(expressionWithoutCommas);
				setDisplayText(result.toLocaleString()); // Adding commas back here
			} catch (error) {
				// Display "Error" in case of an evaluation error
				setDisplayText("Error");
			}
		} else {
			// Append the clicked value to the display text with formatting
			setDisplayText((prevText) => {
				// Handle initial input, prevent leading zeros
				if (prevText === "0" && value !== "." && value !== "0") {
					return value;
				} else if (value === "." && prevText.includes(".")) {
					return prevText; // Avoid multiple decimal points
				} else {
					const newValue = prevText + value;
					return newValue
						.replace(/,/g, "")
						.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			});
		}
	};

	return (
		<div>
			<div className="container">
				<div className="calculator">
					<div className="calculator-display">{displayText}</div>
					<div className="calculator-keys">
						{/* Buttons for digits */}
						<button className="seven" onClick={() => handleButtonClick("7")}>
							7
						</button>
						<button className="eight" onClick={() => handleButtonClick("8")}>
							8
						</button>
						<button className="nine" onClick={() => handleButtonClick("9")}>
							9
						</button>

						{/* Other buttons */}
						<button className="del" onClick={() => handleButtonClick("DEL")}>
							DEL
						</button>
						<button className="four" onClick={() => handleButtonClick("4")}>
							4
						</button>
						<button className="five" onClick={() => handleButtonClick("5")}>
							5
						</button>
						<button className="six" onClick={() => handleButtonClick("6")}>
							6
						</button>
						<button className="plus" onClick={() => handleButtonClick("+")}>
							+
						</button>
						<button className="one" onClick={() => handleButtonClick("1")}>
							1
						</button>
						<button className="two" onClick={() => handleButtonClick("2")}>
							2
						</button>
						<button className="three" onClick={() => handleButtonClick("3")}>
							3
						</button>
						<button className="minus" onClick={() => handleButtonClick("-")}>
							-
						</button>
						<button className="decimal" onClick={() => handleButtonClick(".")}>
							.
						</button>
						<button className="zero" onClick={() => handleButtonClick("0")}>
							0
						</button>
						<button className="divide" onClick={() => handleButtonClick("/")}>
							/
						</button>
						<button className="multiply" onClick={() => handleButtonClick("*")}>
							&times;
						</button>
						<button
							className="reset"
							onClick={() => handleButtonClick("RESET")}
						>
							RESET
						</button>
						<button className="equals" onClick={() => handleButtonClick("=")}>
							=
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
