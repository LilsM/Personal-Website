<?php
    $headers = 'MIME-Version: 1.0\\r\\n';
    $headers .= 'From: somebody@gmail.com' . '\\r\\n' . 'X-Mailer: PHP/' . phpversion();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "contactdetails";
    // Create database connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    

    //get contact details from the file submitted
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $country = $_POST['country'];
    $email  = $_POST['email'];
    $phonenumber = $_POST['phonenumber'];
    $subject = $_POST['subject'];
    

    //check whether the email inputted already exists in the database
    $emailcheck = "SELECT email FROM contacts WHERE email='$email'";
    $emailresult = mysqli_query($conn,$emailcheck);
    if (mysqli_fetch_assoc($emailresult)){
        echo "The email you entered already exists";
    }

    else{
    //insert details into the database
    $insertsql = "INSERT INTO contacts (firstname,lastname,country,email,phonenumber,subjct) VALUES ('$firstname','$lastname','$country','$email','$phonenumber','$subject')";
    $insertquery = mysqli_query($conn,$insertsql);
    // send an email to the person who has filled the form
    if(mail($email, 'Form Response Received', 'Thank you '.$firstname.' for visiting my site. I will get in touch with you as soon as possible.', $headers)){
        echo 'Email sent.';
    } else {
        echo 'Email not sent.';
    }

    }
?>