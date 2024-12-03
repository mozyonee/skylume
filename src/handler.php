<?php

$botToken = "8144986581:AAE3bMII2h90MJbtkmRJf7TeLkXMphFqusk";
$chatIds = ["491984817", "6847935703", "558698682"];

$name = isset($_POST['name']) && $_POST['name'] !== '' ? htmlspecialchars(trim($_POST['name'])) : null;
$phone = isset($_POST['phone']) && $_POST['phone'] !== '' ? htmlspecialchars(trim($_POST['phone'])) : null;
$area = isset($_POST['area']) && $_POST['area'] !== '' ? htmlspecialchars(trim($_POST['area'])) : null;
$lights = isset($_POST['lights']) && $_POST['lights'] !== '' ? htmlspecialchars(trim($_POST['lights'])) : null;
$consult = isset($_POST['consult']) && $_POST['consult'] !== '' ? htmlspecialchars(trim($_POST['consult'])) : null;
$message = isset($_POST['message']) && $_POST['message'] !== '' ? htmlspecialchars(trim($_POST['message'])) : null;

if ($phone == null) {
    header('Location: ../phone.html');
    exit();
}

$text = "<b>Поступило нове замовлення" . ($name ? " від $name" : "") . "!</b>\n";
$text .= $area ? "\n<b>Площа:</b> $area." : "";
$text .= $lights ? "\n<b>Точок світла:</b> $lights." : "";
$text .= $consult ? "\n<b>Годин консультації:</b> $consult." : "";
$text .= $area || $lights || $consult ? "\n<b>Орієнтовна вартість:</b> ".($area*1200+$lights*600+$consult*6000)." ₴.\n" : "";
$text .= $message ? "\n<b>Повідомлення:</b>\n<blockquote expandable>$message</blockquote>" : "";
$text .= $phone ? "\n<b>Телефон:</b> <code>$phone</code>." : "";

$data = [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML'
];

foreach ($chatIds as $chatId) {
    $data['chat_id'] = $chatId;
    $response = file_get_contents("https://api.telegram.org/bot$botToken/sendMessage?" . http_build_query($data));
    if (!$response) error_log("Failed to send message to chat ID: $chatId");
}

header('Location: ../index.html');
exit();

?>