import "./App.css";
import { useState } from "react";
import * as math from "mathjs";

function App() {
	const [displayText, setDisplayText] = useState("0");
	const [resultDisplayed, setResultDisplayed] = useState(false);

	const handleButtonClick = (value) => {
		if (resultDisplayed) {
			if (value === "DEL") {
				setDisplayText("0");
				setResultDisplayed(false);
			} else if (value === "RESET") {
				setDisplayText("0");
				setResultDisplayed(false);
			} else if (value === "=") {
				// Do nothing if = is pressed after the result
			} else {
				setDisplayText(formatDisplayText(displayText + value));
				setResultDisplayed(false);
			}
		} else {
			if (value === "DEL") {
				setDisplayText(displayText.slice(0, -1));
			} else if (value === "RESET") {
				setDisplayText("0");
			} else if (value === "=") {
				try {
					const result = math.evaluate(displayText);
					setDisplayText(formatDisplayText(result.toString()));
					setResultDisplayed(true);
				} catch (error) {
					setDisplayText("Error");
				}
			} else {
				setDisplayText(
					formatDisplayText(displayText === "0" ? value : displayText + value)
				);
			}
		}
	};

	//add a comma after every 3 digits
	const formatDisplayText = (text) => {
		const textArray = text.split("");
		let formattedText = "";
		let counter = 0;
		for (let i = textArray.length - 1; i >= 0; i--) {
			if (counter === 3) {
				formattedText = "," + formattedText;
				counter = 0;
			}
			formattedText = textArray[i] + formattedText;
			counter++;
		}
		return formattedText;

		// return text;
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
