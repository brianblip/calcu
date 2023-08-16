import "./App.css";
import { useState } from "react";
import * as math from "mathjs";

function App() {
	// State to hold the displayed text
	const [displayText, setDisplayText] = useState("0");
	const [theme, setTheme] = useState("theme1"); // State to track the selected theme

	const handleThemeChange = (selectedTheme) => {
		setTheme(selectedTheme);
		document.body.className = selectedTheme;
	};

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
				<div className="calculator-header">
					<div className="title">
						<h4>calc</h4>
					</div>

					<div className="theme-controls">
						<h2>THEME</h2>
					</div>
					<div className="theme-chooser">
						<div
							className={`theme-toggle ${theme === "theme1" ? "active" : ""} `}
							onClick={() => handleThemeChange("theme1")}
						>
							<span className="circle"></span>
						</div>
						<div
							className={`theme-toggle ${theme === "theme2" ? "active" : ""} `}
							onClick={() => handleThemeChange("theme2")}
						>
							<span className="circle"></span>
						</div>
						<div
							className={`theme-toggle ${theme === "theme3" ? "active" : ""} `}
							onClick={() => handleThemeChange("theme3")}
						>
							<span className="circle"></span>
						</div>
					</div>
				</div>

				<div className="calculator">
					<div className="calculator-display">{displayText}</div>
					<div className="calculator-keys">
						{/* Buttons for digits */}

						<button className={`number`} onClick={() => handleButtonClick("7")}>
							7
						</button>
						<button className={`number`} onClick={() => handleButtonClick("8")}>
							8
						</button>
						<button className={`number`} onClick={() => handleButtonClick("9")}>
							9
						</button>

						<button className={`number`} onClick={() => handleButtonClick("4")}>
							4
						</button>
						<button className={`number`} onClick={() => handleButtonClick("5")}>
							5
						</button>
						<button className={`number`} onClick={() => handleButtonClick("6")}>
							6
						</button>
						<button className={`number`} onClick={() => handleButtonClick("1")}>
							1
						</button>
						<button className={`number`} onClick={() => handleButtonClick("2")}>
							2
						</button>
						<button className={`number`} onClick={() => handleButtonClick("3")}>
							3
						</button>
						<button className={`number`} onClick={() => handleButtonClick("0")}>
							0
						</button>
						{/* Other buttons */}
						<button className="del" onClick={() => handleButtonClick("DEL")}>
							DEL
						</button>
						<button className={`number`} onClick={() => handleButtonClick("+")}>
							+
						</button>

						<button className={`number`} onClick={() => handleButtonClick("-")}>
							-
						</button>
						<button className={`number`} onClick={() => handleButtonClick(".")}>
							.
						</button>

						<button className={`number`} onClick={() => handleButtonClick("/")}>
							/
						</button>
						<button className={`number`} onClick={() => handleButtonClick("*")}>
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
