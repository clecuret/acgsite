<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem(__DIR__."/../source/templates");
$twig = new Twig_Environment($loader);

copyr(__DIR__."/../source/baseContent",__DIR__."/../output");
$pages = json_decode(file_get_contents(__DIR__."/../source/pages.json"));
foreach ($pages as $page) {
	$sticky=($page->name=='index.html')?'':'sticky';
    file_put_contents(__DIR__."/../output/".$page->name, $twig->render($page->name,array('title'=>$page->title,'sticky'=>$sticky)));
}
file_put_contents(__DIR__."/../output/sitemap.xml", $twig->render('sitemap.html',array('pages'=>$pages)));




function copyr($source,$dest) { 
    if (is_file($source)) {return copy($source, $dest);}
    if (!is_dir($dest)) {mkdir($dest);}
    $dir = dir($source);
    while (false !== $entry = $dir->read()) {
        if ($entry == '.' || $entry == '..') {continue;}
        copyr("$source/$entry", "$dest/$entry");
    }
    $dir->close();
    return true;
}
