import { useState } from 'react'; 
import './Home_old.css'; 
import Editor from "@monaco-editor/react"; 
import Navbar_old from './Navbar_old'; 
import Axios from 'axios'; 
// import spinner from './spinner.svg'; 

function Home_old() { 

	// State variable to set users source code 
	const [userCode, setUserCode] = useState(``); 

	// State variable to set editors default language 
	const [userLang, setUserLang] = useState("python"); 

	// State variable to set editors default theme 
	const [userTheme, setUserTheme] = useState("vs-dark"); 

	// State variable to set editors default font size 
	const [fontSize, setFontSize] = useState(20); 

	// State variable to set users input 
	const [userInput, setUserInput] = useState(""); 

	// State variable to set users output 
	const [userOutput, setUserOutput] = useState(""); 

	// Loading state variable to show spinner 
	// while fetching data 
	const [loading, setLoading] = useState(false); 

	const options = { 
		fontSize: fontSize 
	} 

	// Function to call the compile endpoint 
	function compile() { 
		// alert('hi');
		console.log("click compiler");
		setLoading(true); 
		if (userCode === ``) { 
			return
		} 
		console.log(userCode);
		
        console.log("compiler code ajax starting..");
		// Post request to compile endpoint 
		Axios.post(`http://localhost:8000/compile`, { 
			code: userCode, 
			language: userLang, 
			input: userInput 
		}).then((res) => { 
			setUserOutput(res.data.output); 
		}).then(() => { 
			setLoading(false); 
            console.log("online compiler ajax falling");
		}) 
        console.log("compiler code ajax runing");
	} 

	// Function to clear the output screen 
	function clearOutput() { 
		setUserOutput(""); 
	} 

	return ( 
		<div className="App"> 
			<Navbar_old 
			  userLang={userLang} setUserLang={setUserLang}
			  userTheme={userTheme} setUserTheme={setUserTheme}
			  FontSize={fontSize} setFontSize={setFontSize}
			/> 
			{console.log("user sleection language"+userLang)}
			
			<div className="main"> 
				<div className="left-container"> 
					<Editor 
						options={options} 
						height="calc(100vh - 50px)"
						width="100%"
						theme={userTheme} 
						language={userLang} 
						defaultLanguage="python"
						defaultValue="# Enter your code here"
						onChange={(value) => { setUserCode(value) }} 
					/> 
					<button className="run-btn" onClick={() => compile()}> 
						Run 
					</button> 
				</div> 
				<div className="right-container"> 
					<h4>Input:</h4> 
					<div className="input-box"> 
						<textarea id="code-inp" onChange= 
							{(e) => setUserInput(e.target.value)}> 
						</textarea> 
					</div> 
					<h4>Output:</h4> 
					{loading ? ( 
						<div className="spinner-box"> 
                            <h2>Loading...</h2>
						</div> 
					) : ( 
						<div className="output-box"> 
							<pre>{userOutput}</pre> 
							<button onClick={() => { clearOutput() }} 
								className="clear-btn"> 
								Clear 
							</button> 
						</div> 
					)} 
				</div> 
			</div> 
		</div> 
	); 
} 

export default Home_old;
