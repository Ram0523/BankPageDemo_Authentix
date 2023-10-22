// Import the necessary libraries if required
// const md5 = require('blueimp-md5');


function showLoader() {
    const overlay = document.querySelector('.overlay_screen');
    if (overlay) {
        overlay.style.display = 'block';
    }
}

function hideLoader() {
    const overlay = document.querySelector('.overlay_screen');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Function to clean and hash data
async function clean(data) {
    // Remove special characters using a regular expression
    const cleanedData = data
        .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters
        .toUpperCase(); // Convert to uppercase

    return cleanedData;
}

async function clean2(inputData) {
    // Remove all non-numeric characters
    const cleanedData2 = inputData.replace(/[^0-9]/g, '');

    return cleanedData2;
}

async function hash(concatfinal) {
    // Compute the MD5 hash using the blueimp-md5 library
    const hashHex = md5(concatfinal);
    return hashHex;
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('em').value;
    const phoneNumber = document.getElementById('phone').value;
    const address1 = document.getElementById('line1').value;
    const address2 = document.getElementById('line2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const educationLevel = document.querySelector('input[name="education_level"]:checked').value;
    const addhar = document.getElementById('addhar').value;
    const accountType = document.getElementById('acc_type').value;
    const accountCategory = document.getElementById('acc_cat').value;
    const annualSalary = document.getElementById('salary').value;

    // Concatenate the form data
    const concatenatedData1 = `${firstName}${middleName}${lastName}${address1}${address2}${city}${state}${country}`;
    const concatenatedData2 = `${zip}${addhar}`;

    // Clean and hash the data
    const cleansed = await clean(concatenatedData1);
    const cleansed2 = await clean2(concatenatedData2);

    const concatfinal = `${cleansed}${cleansed2}`;
    const hashedData = await hash(concatfinal);

    // Display the result on the page
    // const resultElement = document.getElementById('register');
    // resultElement.textContent = `Concatenated and Hashed Data: ${hashedData}`;
}

// Function to truncate a string to 32 bytes (64 hexadecimal characters)
function truncateToBytes32(input) {
    const hexString = ethers.utils.toUtf8Bytes(input).slice(0, 32);
    return ethers.utils.hexlify(hexString).padEnd(66, '0'); // Pad to 66 characters
}

// Event listener for the "Register" button click
// ... (Previous code)

// Event listener for the "Register" button click
const registerButton = document.getElementById("register");
registerButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    showLoader(); // Show the loader overlay

    // Get user input from the form
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('em').value;
    const phoneNumber = document.getElementById('phone').value;
    const address1 = document.getElementById('line1').value;
    const address2 = document.getElementById('line2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const educationLevel = document.querySelector('input[name="education_level"]:checked').value;
    const addhar = document.getElementById('addhar').value;
    const accountType = document.getElementById('acc_type').value;
    const accountCategory = document.getElementById('acc_cat').value;
    const annualSalary = document.getElementById('salary').value;

    // Concatenate the form data
    const concatenatedData1 = `${firstName}${middleName}${lastName}${address1}${address2}${city}${state}${country}`;
    const concatenatedData2 = `${zip}${addhar}`;

    // Clean and hash the data
    const cleansed = await clean(concatenatedData1);
    const cleansed2 = await clean2(concatenatedData2);

    const concatfinal = `${cleansed}${cleansed2}`;
    const hashedData = await hash(concatfinal);

    // Display the result on the page
    // const resultElement = document.getElementById("register");

    const timestampInSeconds = Math.floor(new Date().getTime() / 1000);

    var message = "Please verify your account";
    const originID = "FDRL212";

    // Send data to the smart contract
    try {
        // Connect to your Ethereum provider and prepare the transaction
        const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/dc85879f7b534b6091b88afe023bad23'); // Replace with your Ethereum provider URL
        const privateKey = 'a3a3bd56ca3179953f3053369d9ca800cb713c809ca075361b0d6dc063ebbf37'; // Replace with your private key
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractABI =[
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "bankAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "bankName",
                        "type": "string"
                    }
                ],
                "name": "addPartyMember",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "hashString",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "originID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "data",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "apiEquivalentCaller",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "checkAdd",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "txnHash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "originID",
                        "type": "string"
                    }
                ],
                "name": "confirmRequest",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_hash",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    }
                ],
                "name": "storeIdMapping",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "encryptedData",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "DataEncrypted",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes32",
                        "name": "checkAdd",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "txnHash",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "originID",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "responseCode",
                        "type": "string"
                    }
                ],
                "name": "requestStatus",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "_encryptedData",
                        "type": "bytes32"
                    }
                ],
                "name": "searchMapping",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const contractAddress = '0x8CB70A4cdAe2964f5Abb648bff99Ce3DA4CE7061'; // Replace with your contract address
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);

        // Convert the hashed data to bytes32 (truncated if too long)
        // const hashedDataBytes32 = truncateToBytes32(hashedData);

        // Set an initial gas limit (you can adjust this value based on your needs)
        const initialGasLimit = 3000000;

        const gasPrice = ethers.utils.parseUnits('10', 'gwei');
        // Specify a gas price (in wei) based on your network's current gas prices

        var returnValue = await contract.callStatic.apiEquivalentCaller(hashedData, originID, message, timestampInSeconds);

        if(returnValue != "0x5380c7b7ae81a58eb98d9c78de4a1fd7fd9535fc953ed2be602daaa41767312a"){
            // Send the transaction to call the smart contract function
            const tx = await contract.apiEquivalentCaller(hashedData, originID, message, timestampInSeconds, {
                gasLimit: initialGasLimit,
                gasPrice: gasPrice,
            });

            console.log('Transaction Hash:', tx.hash);
            console.log('datahash:', hashedData);

            // Log the return value
            // 0x5380c7b7ae81a58eb98d9c78de4a1fd7fd9535fc953ed2be602daaa41767312a   for non registered user
            console.log('Returned bytes32 value:', returnValue);

            // Start a timer for 15 minutes (in milliseconds)
            const timeoutDuration = 25 * 60 * 1000; // 15 minutes in milliseconds
            setTimeout(() => {
                // After 15 minutes, display the timeout message and redirect
                const resultMessage = 'Request timeout! Please try again.';
                window.location.href = `registration_result.html?message=${encodeURIComponent(resultMessage)}`;
            }, timeoutDuration);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            // Check if the transaction was successful
            if (receipt.status === 1) {
                console.log('Transaction Successful');
                console.log('Timestamp:', timestampInSeconds);

            } else {
                console.error('Transaction Failed');
                console.error('Transaction Receipt:', receipt);
            }

            // const txnhash = tx.hash; // Replace with the actual txnhash
            // const originID = "FDRL212"; // Replace with the actual originID

            // Create a JSON object with the data to send
            const dataToSend = {
                txnHash: tx.hash,
                originID: "FDRL212",
                checkAdd: returnValue,
            };

            try {
                const response = await fetch('http://localhost:3000/from-frontend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                if (response.ok) {
                    const responseData = await response.json(); // Read the response as text
                    // After receiving the response from the smart contract
                    console.log(responseData);
                    // const responseData = [{ "status": 'success', "message": 'Message processed successfully', "response": '403' }];
                    const responseCode = responseData.response;

                    let resultMessage = '';

                    if (responseCode == 202) {
                        // Response code is 202 (success)
                        resultMessage = 'Registration was successful! Thank you for signing up.';

                        // Execute the PHP script to store data in the database
                        fetch("connection1.php", {
                            method: 'POST',
                            body: JSON.stringify({
                                firstName: firstName,
                                middleName: middleName,
                                lastName: lastName,
                                dob: dob,
                                email: email,
                                phoneNumber: phoneNumber,
                                address1: address1,
                                address2: address2,
                                city: city,
                                state: state,
                                zip: zip,
                                country: country,
                                educationLevel: educationLevel,
                                addhar: addhar,
                                accountType: accountType,
                                accountCategory: accountCategory,
                                annualSalary: annualSalary
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((response) => response.text())
                            .then((result) => {
                                hideLoader();
                                // Redirect to registration_result.html on success
                                window.location.href = `registration_result.html?message=${encodeURIComponent(resultMessage)}`;
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                hideLoader();

                            });
                    } else if (responseCode == 404) {
                        hideLoader();
                        resultMessage = 'Oops! Your address doesn\'t exist.';
                        // Redirect to registration_result.html with the appropriate message
                        window.location.href = `registration_result.html?message=${encodeURIComponent(resultMessage)}`;
                    } else if (responseCode == 403) {
                        hideLoader();
                        resultMessage = 'Your application has been rejected!';
                        // Redirect to registration_result.html with the appropriate message
                        window.location.href = `registration_result.html?message=${encodeURIComponent(resultMessage)}`;
                    } 
                    // else if (responseCode == 408) {
                    //     hideLoader();
                    //     resultMessage = 'Request timeout! Please try again.';
                    //     // Redirect to registration_result.html with the appropriate message
                    //     window.location.href = `registration_result.html?message=${encodeURIComponent(resultMessage)}`;
                    // } 
                    else {
                        // Handle other response codes as needed
                    }

                    console.log('Response from Node.js:', responseData);
                } else {
                    console.error('Error sending data:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }else if(returnValue == "0x5380c7b7ae81a58eb98d9c78de4a1fd7fd9535fc953ed2be602daaa41767312a"){
            Swal.fire("Please try again!", "You might not be registered with Authentix or your ID details might contain typo", "error");
            hideLoader();
        }



    } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error here or display an error message to the user.
        hideLoader();

    }
});