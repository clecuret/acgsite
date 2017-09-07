<?php
require_once 'vendor/autoload.php';



$loader = new Twig_Loader_Filesystem(__DIR__."/../source/templates");
$twig = new Twig_Environment($loader);

copyr(__DIR__."/../source/baseContent",__DIR__."/../output");
$data = json_decode(file_get_contents(__DIR__."/../source/data.json"),true);
$pages = json_decode(file_get_contents(__DIR__."/../source/pages.json"));
foreach ($pages as $page) {
    $sticky=($page->name=='index')?'':'sticky';
    $params = array('title'=>$page->title,'sticky'=>$sticky);
    $params=array_merge($params,(array_key_exists($page->name, $data))?$data[$page->name]:array());
    if (($page->name=='pricing')) $params['prices'] = $data['prices'];
    $params=array_merge($params,getTimeslots($data['timeslots'],$page->name));
    file_put_contents(__DIR__."/../output/".$page->name.'.html', $twig->render($page->name.'.html',$params));
}
file_put_contents(__DIR__."/../output/sitemap.xml", $twig->render('sitemap.html',array('pages'=>$pages)));


function getTimeslots($ts,$pagename){
    $classday=array('Lundi'=>'Monday','Mardi'=>'Tuesday','Mercredi'=>'Wednesday','Jeudi'=>'Thursday','Vendredi'=>'Friday','Samedi'=>'Saturday','Dimanche'=>'Sunday');
    $perdays = array();
    foreach ($ts as $timeslot) {
         if (($timeslot['page']==$pagename)||($pagename=='contact')) {
            $day=$timeslot['day'];
            if (!array_key_exists($day, $perdays))
                $perdays[$day] = array('desc'=>array());
            $perdays[$day]['desc'][] = $timeslot['name'].' de '.$timeslot['start'].' à '.$timeslot['end'];
            $perdays[$day]['class'] = $classday[$day];
            $perdays[$day]['min'] = (array_key_exists('min', $perdays[$day]))?min($perdays[$day]['min'],$timeslot['start']):$timeslot['start'];
            $perdays[$day]['max'] = (array_key_exists('max', $perdays[$day]))?max($perdays[$day]['max'],$timeslot['end']):$timeslot['end'];

         }
    }
    return array('timeslots'=>$perdays);
}

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
