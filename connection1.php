<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    // JSON data couldn't be parsed
    echo "Error: Invalid JSON data";
} else {
    // Extract data from the JSON object
    $first_name = $data['firstName'];
    $middle_name = $data['middleName'];
    $last_name = $data['lastName'];
    $date_of_birth = $data['dob'];
    $email = $data['email'];
    $phone_number = $data['phoneNumber'];
    $address1 = $data['address1'];
    $address2 = $data['address2'];
    $city = $data['city'];
    $state = $data['state'];
    $zip = $data['zip'];
    $citizenship = $data['country'];
    $education_level = $data['educationLevel'];
    $addhar = $data['addhar'];
    $account_type = $data['accountType'];
    $account_category = $data['accountCategory'];
    $annual_salary = $data['annualSalary'];

    // Insert form data into the database
    $sql = "INSERT INTO registration_form (first_name, middle_name, last_name, date_of_birth, email, phone_number, addressL1, addressL2, city, state, zip, citizenship, education_level, addhar, account_type, account_category, annual_salary)
    VALUES ('$first_name', '$middle_name', '$last_name', '$date_of_birth', '$email', '$phone_number', '$address1', '$address2', '$city', '$state', '$zip', '$citizenship', '$education_level', '$addhar', '$account_type', '$account_category', '$annual_salary')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
