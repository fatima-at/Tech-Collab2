<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }
        .header h1 {
            color: #333333;
        }
        .content {
            margin-top: 20px;
            color: #666666;
            line-height: 1.6;
        }
        .button-container {
            text-align: center;
            margin-top: 30px;
        }
        .verify-button {
            background-color: #1E88E5;
            color: #ffffff;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Email Address</h1>
        </div>
        <div class="content">
            <p>Hello, <strong>{{ $user->name }}</strong>,</p>
            <p>Thank you for registering with us. To complete your registration, please verify your email address by clicking the button below:</p>
        </div>
        <div class="button-container">
            <a href="{{ env('FRONTEND_URL') . '/verify-email?token=' . $token }}" class="verify-button">Verify Email</a>
        </div>
        <div class="content">
            <p>If you did not create an account, no further action is required.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Tech-Collab. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
