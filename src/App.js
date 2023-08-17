import "./App.css";
import { useState } from "react";
import * as math from "mathjs";

function App() {
	// State to hold the displayed text
	const [displayText, setDisplayText] = useState("0");
	const [theme, setTheme] = useState("theme1"); // State to track the selected theme
	const [operatorClicked, setOperatorClicked] = useState(false);

	// Adjusted handleThemeChange function
	const handleThemeChange = (selectedTheme) => {
		setTheme(selectedTheme);
		document.body.className = selectedTheme;
		const toggleElements = document.querySelectorAll(".theme-toggle");
		toggleElements.forEach((toggleElement) => {
			toggleElement.classList.toggle(
				"active",
				toggleElement.dataset.theme === selectedTheme
			);
		});

		const themeChooser = document.querySelector(".theme-chooser");
		switch (selectedTheme) {
			case "theme1":
				themeChooser.style.backgroundColor = "var(--very-dark-blue-toggle)";
				break;
			case "theme2":
				themeChooser.style.backgroundColor = "var(--grayish-red)";
				break;
			case "theme3":
				themeChooser.style.backgroundColor = "var(--very-dark-violet-toggle)";
				break;
			default:
				themeChooser.style.backgroundColor = "var(--very-dark-blue-toggle)";
				break;
		}
	};

	// Function to handle button clicks
	const handleButtonClick = (value) => {
		if (value === "DEL") {
			setDisplayText((prevText) =>
				prevText.length === 1 ? "0" : prevText.slice(0, -1)
			);
		} else if (value === "RESET") {
			// Reset the display
			setDisplayText("0");
			setOperatorClicked(false); // Reset the operator clicked state
		} else if (value === "=") {
			try {
				const result = math.evaluate(displayText);
				setDisplayText(result.toLocaleString()); // Adding commas back here
			} catch (error) {
				// Display "Error" in case of an evaluation error
				setDisplayText("Error");
			}
			setOperatorClicked(false); // Reset the operator clicked state
		} else if (/[\+\-\*\/\.]/.test(value)) {
			// Check if the value is an operator
			if (!operatorClicked) {
				setDisplayText((prevText) => prevText + value);
				setOperatorClicked(true);
			} else {
				// Replace the previous operator with the new one
				setDisplayText((prevText) => prevText.slice(0, -1) + value);
			}
		} else if (value === ".") {
			if (!displayText.includes(".")) {
				setDisplayText((prevText) => prevText + ".");
			}
		} else {
			// Append the clicked value to the display text with formatting
			setDisplayText((prevText) => {
				// Handle initial input, prevent leading zeros
				if (prevText === "0" && value !== "0") {
					return value;
				} else {
					return prevText + value;
				}
			});
			setOperatorClicked(false);
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
					<div className="theme-numbers">
						<div className="theme-number1">
							<h6>1</h6>
						</div>
						<div className="theme-number2">
							<h6>2</h6>
						</div>
						<div className="theme-number3">
							<h6>3</h6>
						</div>
					</div>
					<div className="theme-chooser">
						<div
							className={`theme-toggle theme1-toggle ${
								theme === "theme1" ? "active" : ""
							}`}
							onClick={() => handleThemeChange("theme1")}
							data-theme="theme1"
						></div>

						<div
							className={`theme-toggle theme2-toggle ${
								theme === "theme2" ? "active" : ""
							}`}
							onClick={() => handleThemeChange("theme2")}
							data-theme="theme2"
						></div>

						<div
							className={`theme-toggle theme3-toggle ${
								theme === "theme3" ? "active" : ""
							}`} 
							onClick={() => handleThemeChange("theme3")}
							data-theme="theme3"
						></div>
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
						<button className={`number`} onClick={() => handleButtonClick("+")}>
							+
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
						<button className={`number`} onClick={() => handleButtonClick("-")}>
							-
						</button>
						<button className={`number`} onClick={() => handleButtonClick("0")}>
							0
						</button>
						{/* Other buttons */}
						<button className="del" onClick={() => handleButtonClick("DEL")}>
							DEL
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
