<?php
require '../vendor/autoload.php'; // Atur path jika perlu
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $feedback = $_POST['feedback'];
    
    // Buat instance dari PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Konfigurasi SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Ganti dengan host SMTP Anda
        $mail->SMTPAuth = true;
        $mail->Username = 'muhamadadhiw@gmail.com'; // Ganti dengan email Anda
        $mail->Password = 'onvq voor wmme vjit'; // Ganti dengan password Anda
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Penerima dan Pengirim
        $mail->setFrom('muhamadadhiw@gmail.com', 'Weather App'); // Ganti dengan email dan nama Anda
        $mail->addAddress($email); // Ganti dengan alamat email penerima

        // Konten
        $mail->isHTML(true);
        $mail->Subject = 'Kritik dan Saran dari Pengguna';
        $mail->Body = "<p><strong>Email:</strong> $email</p><p><strong>Kritik dan Saran:</strong><br>$feedback</p>";
        $mail->AltBody = "Email: $email\nKritik dan Saran:\n$feedback";

        $mail->send();
        echo 'Kritik dan saran Anda telah dikirim.';
    } catch (Exception $e) {
        echo "Email tidak dapat dikirim. Error: {$mail->ErrorInfo}";
    }
}
?>
