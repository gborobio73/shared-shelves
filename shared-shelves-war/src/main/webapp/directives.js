'use strict';
var cities = ["Akaa","Alajärvi","Alavus","Espoo","Forssa","Haapajärvi","Haapavesi","Hamina","Hanko","Harjavalta","Haukipudas","Heinola","Helsinki","Huittinen","Hyvinkää","Hämeenlinna","Iisalmi","Ikaalinen","Imatra","Joensuu","Juankoski","Jyväskylä","Jämsä","Järvenpää","Kaarina","Kajaani","Kalajoki","Kankaanpää","Kannus","Karkkila","Kaskinen","Kauhajoki","Kauhava","Kauniainen","Kemi","Kemijärvi","Kerava","Keuruu","Kitee","Kiuruvesi","Kokemäki","Kokkola","Kotka","Kouvola","Kristiinankaupunki","Kuhmo","Kuopio","Kurikka","Kuusamo","Lahti","Laitila","Lappeenranta","Lapua","Lieksa","Lohja","Loimaa","Loviisa","Maarianhamina","Mikkeli","Mänttä-Vilppula","Naantali","Nilsiä","Nivala","Nokia","Nurmes","Närpiö","Orimattila","Orivesi","Oulainen","Oulu","Outokumpu","Paimio","Parainen","Parkano","Pieksämäki","Pietarsaari","Pori","Porvoo","Pudasjärvi","Pyhäjärvi","Raahe","Raasepori","Raisio","Rauma","Riihimäki","Rovaniemi","Saarijärvi","Salo","Sastamala","Savonlinna","Seinäjoki","Siuntio","Somero","Suonenjoki","Tampere","Tornio","Turku","Ulvila","Uusikaarlepyy","Uusikaupunki","Vaasa","Valkeakoski","Vantaa","Varkaus","Viitasaari","Virrat","Ylivieska","Ylöjärvi","Ähtäri","Äänekoski"];
var prices = [1,2,3,5,7,8,9,10];

angular.module('tbe.directives', [])

.directive('navMenu',[ function() {
    return {
      templateUrl: 'shared/nav-menu.html'
    };
}])

.directive('bookInfo', [function() {
    return {
      templateUrl: 'shared/book-info.html'
    };
}])

.directive('errorLabels', [function() {
    return {
      templateUrl: 'shared/error-labels.html'
    };
}])

.directive('books', [function() {
    return {
      templateUrl: 'shared/books.html'
    };
}])

.directive('faqDetails', [function() {
    return {
      templateUrl: 'shared/faq-details.html'
    };
}])
;
