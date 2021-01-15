#!/usr/local/bin/perl
use CGI;
#フォームからデータを受け取り変数へ入れる
read(STDIN, $formin, $ENV{'CONTENT_LENGTH'});

# + 記号を半角スペースに戻す
$formin =~ tr/+/ /;

#URLエンコードデータをデコード
$formin =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;

@indata = split (/&/,$formin); #受け取ったデータを＆で区切り、配列へ

foreach $tmp (@indata) #フォームの要素分（配列分）以下の処理を繰り返す
{
	($name,$value) = split (/=/,$tmp); # =記号で区切り、名前 と 値 に分ける
	$forminh{$name} = $value; #区切った名前を付けた連想配列に値を入れる
}

#既存ファイルを読み込み、配列@aaa に入れる
# open (IN,"result1.csv");
# @aaa = <IN>;
# close (IN);

$forminh{'whyAttractiveWork'} =~ s/\r\n//g;
$forminh{'whyAttractiveWork'} =~ s/\n//g;
$forminh{'whyAttractiveWork'} =~ s/\r//g;
$forminh{'agriImpressionOther'} =~ s/\r\n//g;
$forminh{'agriImpressionOther'} =~ s/\n//g;
$forminh{'agriImpressionOther'} =~ s/\r//g;
$forminh{'WTWyesWhy'} =~ s/\r\n//g;
$forminh{'WTWyesWhy'} =~ s/\n//g;
$forminh{'WTWyesWhy'} =~ s/\r//g;
$forminh{'WTWnoWhy'} =~ s/\r\n//g;
$forminh{'WTWnoWhy'} =~ s/\n//g;
$forminh{'WTWnoWhy'} =~ s/\r//g;
$forminh{'WTWif'} =~ s/\r\n//g;
$forminh{'WTWif'} =~ s/\n//g;
$forminh{'WTWif'} =~ s/\r//g;

#フォームから受け取ったデータを配列の先頭に追加する
#その際に各要素はコンマで区切り、後で使えるようにする
# push (@aaa,"$forminh{'name'}, $forminh{'mail'}\n");
# print STDOUT ("$forminh{'name'}, $forminh{'mail'}\n");
my $cgi = new CGI;
my @important = $cgi->param('important');
my $a = "";
foreach $item (@important)
{
  $a += $item + "."
};

my @b = ("$forminh{'name'},$forminh{'mail'},$forminh{'age'},$forminh{'sex'},$forminh{'home'},$forminh{'fulltime'},$forminh{'faculty'},$forminh{'attractiveWork'},$forminh{'whyAttractiveWork'},$forminh{'workChoiceImportant1'},$forminh{'workChoiceImportant2'},$forminh{'workChoiceImportant3'},$forminh{'income'},$forminh{'3K'},$forminh{'moreBrain'},$forminh{'university'},$forminh{'managementStrategy'},$forminh{'cool'},$forminh{'difficultToStart'},$forminh{'agriImpressionOther'},$forminh{'wantToWork'},$forminh{'wantToWork'},$forminh{'WTWnoWhy'},$forminh{'WTWif'},$forminh{'knowSmart'},$forminh{'smartCool'},\n");
#新しいデータが追記された配列を test.txt に書き出す
open (OUT,">>result1.csv");
print OUT @b;
close (OUT);


print "Content-type: text/html\n\n";
print <<"HTML";
<!DOCTYPE html>
<html lang="ja" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>ご協力ありがとうございました</h1>
    <p>回答が送信されました。</p>
  </body>
</html>
HTML
exit;
