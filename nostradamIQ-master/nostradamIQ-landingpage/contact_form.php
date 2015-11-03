
<?php
    if (isset($_POST["submit"])) {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $subject = htmlspecialchars($_POST['subject']);
        $message = htmlspecialchars($_POST['message']);
        $human = intval(htmlspecialchars($_POST['human']));
        $from = 'nostradamiq.org LandingPage ContactForm'; 
        $to = 'info@nostradamiq.org'; 
        // Render Body:
        $body = "From: $name\n E-Mail: $email\n Message:\n $message";
        
        // initialize error check:
        $NameErr = false;
        $EmailErr = false;
        $IssueErr = false;
        $MessageErr = false;
        $HumanErr = false;
 
        // Check if name has been entered
        if (!$_POST['name']) {
            $errName = 'Please enter Your name';
            $NameErr = true;
        }
        
        // Check if email has been entered and is valid
        if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $errEmail = '<p class="text-danger">Please enter Your real Email address! We want to write back to You!</p>';
            $EmailErr = true;
        }

        // Check if Subject has been entered
        if (!$_POST['subject']) {
            $errIssue = '<p class="text-danger">Please select a subject!</p>';
            $IssueErr = true;
        }
        
        //Check if message has been entered
        if (!$_POST['message']) {
            $errMessage = '<p class="text-danger">Please enter Your message!</p>';
            $MessageErr = true;
        }
        //Check if simple anti-bot test is correct
        if ($human !== 5) {
            $errHuman = '<p class="text-danger">Your anti-spam is incorrect!</p>';
            $HumanErr = true;
        }
 
        // If there are no errors, send the email
        if (!$NameErr && !$EmailErr && !$IssueErr && !$MessageErr && !$HumanErr) {
            if (mail ($to, $subject, $body, $from)) {
                $result = '<div class="alert alert-success">Thank You! We will be in touch with You soon!</div>';
            } else {
                $result = '<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later</div>';
            }
        }
    }
?>