<?php
    echo $_POST;
    echo 'testtest';
?>
<?php print_r($_POST);
$ShiftJIS = $_POST; 
mb_convert_variables('Shift_JIS', 'UTF-8', $ShiftJIS); 
$csv = fopen('file.csv', 'a');
fputcsv($csv,$ShiftJIS);
fclose($csv);
echo 111111111111111;
echo $_POST['WTWif'];
$url = 'https://0o-taro-o0.github.io/test1/questionaire.json';
$json = file_get_contents($url);
$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
echo $json;
?>
