// App.js

import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: "",
      input2: "",
      relation: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  relationshipStatus = () => {
    const { input1, input2 } = this.state;

    // Helper function to remove common letters from both strings
    const removeCommonLetters = (str1, str2) => {
      if (str1.length === 0 || str2.length === 0) {
        this.setState({ relation: "Please Enter valid input" });
        return [];
      }
      let charCount1 = {};
      let charCount2 = {};

      // Count the characters in the first string
      for (let char of str1) {
        charCount1[char] = (charCount1[char] || 0) + 1;
      }

      // Count the characters in the second string
      for (let char of str2) {
        charCount2[char] = (charCount2[char] || 0) + 1;
      }

      // Remove common characters
      let result1 = "";
      let result2 = "";

      for (let char of str1) {
        if (charCount2[char]) {
          charCount2[char]--;
        } else {
          result1 += char;
        }
      }

      for (let char of str2) {
        if (charCount1[char]) {
          charCount1[char]--;
        } else {
          result2 += char;
        }
      }

      return [result1, result2];
    };

    const [remainingName1, remainingName2] = removeCommonLetters(
      input1,
      input2
    );

    // Check if the result is valid to destructure
    if (remainingName1 === undefined || remainingName2 === undefined) {
      // Handle error case, if necessary
      console.log("Error: Unable to calculate remaining names");
      return;
    }

    const remainingLengthSum = remainingName1.length + remainingName2.length;
    const result = remainingLengthSum % 6;

    // Determine the relationship status based on the result
    let status = "";
    switch (result) {
      case 0:
        status = "Friends";
        break;
      case 1:
        status = "Love";
        break;
      case 2:
        status = "Affection";
        break;
      case 3:
        status = "Marriage";
        break;
      case 4:
        status = "Enemy";
        break;
      case 5:
        status = "Siblings";
        break;
      default:
        status = "Unknown";
        break;
    }
    this.setState({ relation: status });
  };

  render() {
    const { input1, input2, relation } = this.state;

    return (
      <div id="main">
        <input
          type="text"
          name="input1"
          value={input1}
          onChange={this.handleInputChange}
          placeholder="Enter first Name"
        />
        <input
          type="text"
          name="input2"
          value={input2}
          onChange={this.handleInputChange}
          placeholder="Enter second Name"
        />
        <button onClick={this.relationshipStatus}>
          Calculate Relationship Future
        </button>
        <button
          onClick={() => {
            this.setState({ input1: "", input2: "", relation: "" });
          }}
        >
          Clear
        </button>
        <p>{relation}</p>
      </div>
    );
  }
}

export default App;
