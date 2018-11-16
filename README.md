Kde jsem skoncil:
 - uz mam teda prochazejici push, dostava mi to dobre ty aktualni stats.
 - vyzkouset jestli to updated chyta fakt updated .. kdyz tak bych tam musel delat nejakou id chytristiku, coz bych nerad
 - pak teda udelat to zaokrouhlovani, idealne i s parametrama
 
 - vypada to tak, ze klasicky trigger akorat chyta kdyz v listu neco pribyde - pak pry jeste existuje update trigger, co ma v name updated a ten kouka jestli se to zmenilo
 - v email kroku muzes do email template nacpat cokoliv co prislo v response toho triggeru - takze tak se to spoji
 - takze spravne dle guideline by to asi melo byt tak, ze vypustis akci na update, pak to v dalsim kroku ofiltrujes jenom kdyz jsi prekrocil kulatinu (coz teda nevim jestli by vubec slo)
 - takze ja bych to videl - udelat update trigger, narvat do response jenom zaokrouhleny stats a to kdyz se zmeni, tak voila, posli mi email .. cili tohle bude ten zapier delat za me, cili nemusim resit posledni aktivity apod.

 - udelal jsem gettovani tech stats, chce to po me, aby tam bylo id. podle toho to pry poznava jestli ne to novy objekt - muj problem je ze to nebude novy objekt, ale bude tam zmena - mozna neco co se jmenuej hook. kazdopadne chyba: https://zapier.com/developer/documentation/v2/app-checks-reference/#ZDE009
 - nejdriv to tam asi pushnu a udelam jenom trigger na https://www.strava.com/api/v3/athlete 
 - je potreba vyresit jak tam dat to athlete id, ponevadz ten vtip je na https://www.strava.com/api/v3/athletes/705929/stats?
 - jeste by to chtelo vyresit refreshovani toho tokenu
 - poresit alerty: https://github.com/cvengros/zapier-strava/network/alerts

Done:
 - nejspis musis na strave povolit domenu asi
 - upload se poved, je to tam jako Strava 1.0.0 .. hazi to nejakej error co rika neco o bad request invalid redirect uri, kdyz zkusis udelat connect account 

 https://www.strava.com/oauth/authorize?client_id=10060&state=1542295683.9929224&redirect_uri=https%3A%2F%2Fzapier.com%2Fdashboard%2Fauth%2Foauth%2Freturn%2FApp3541CLIAPI%2F&response_type=code&scope=read

