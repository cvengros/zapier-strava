Kde jsem skoncil:
 - vydelit vsechny stats tisicem
 - takze nakonec vracet stats, projit par poslednich aktivit a koukat co prehouplo, pri prvnim prehoupnuti konec. tim ze se to bude poustet akorat kdyz se menily ty kulaty, tak je zaruceny ze nedostanes email se starym prehoupnutim
 - poslat max jeden mail per task (zap run) - kdybych tam narval kazdou novou aktivitu, tak dostanu email za kazdou aktivitu a maximalne tam bude napsany, ze sorry, nic jsi neprekrocil
 - Zvazit - trigger na activity, kouknout jestli prehoupla, vzit stats - pak nebudu muset resit ty pozdni uploady a pod, pocitat si totaly minus to co prochazim - otazka ale je jestli to nebude chodit vickrat - za kazdou novou aktivitu
 - To jak jsem to udelal - nezjistim co byla posledni zmena - budu muset stejne potahat ty aktivity, kouknout co prehouplo - bohuzel nevidim co uz tam je - co bylo minule. takze to musim nejak zrekonstruovat z tech aktivit
  - cili asi pujdu po aktivitach od nejnovejsich a budu to odcitat od tech summary - podle typu. Az narazim na prvni aktivitu co to preskocila, tak to hodim do tech dalsich fieldu, abych vedel - typ, kolik mam ted. a tim koncim.
  - prdim na zpetny dohravani aktivit - proste beru par poslednich a nazdar
  - budu si pamatovat posledni - nebudu, protoze to proste nedrzi stav
 
 - parametry - milestony
 - v email kroku muzes do email template nacpat cokoliv co prislo v response toho triggeru - takze tak se to spoji
 - takze spravne dle guideline by to asi melo byt tak, ze vypustis akci na update, pak to v dalsim kroku ofiltrujes jenom kdyz jsi prekrocil kulatinu (coz teda nevim jestli by vubec slo)
 - takze ja bych to videl - udelat update trigger, narvat do response jenom zaokrouhleny stats a to kdyz se zmeni, tak voila, posli mi email .. cili tohle bude ten zapier delat za me, cili nemusim resit posledni aktivity apod. bohuzel ale takhle nevim co se zmenilo

 - udelal jsem gettovani tech stats, chce to po me, aby tam bylo id. podle toho to pry poznava jestli ne to novy objekt - muj problem je ze to nebude novy objekt, ale bude tam zmena - mozna neco co se jmenuej hook. kazdopadne chyba: https://zapier.com/developer/documentation/v2/app-checks-reference/#ZDE009
 - nejdriv to tam asi pushnu a udelam jenom trigger na https://www.strava.com/api/v3/athlete 
 - je potreba vyresit jak tam dat to athlete id, ponevadz ten vtip je na https://www.strava.com/api/v3/athletes/705929/stats?
 - poresit alerty: https://github.com/cvengros/zapier-strava/network/alerts

Navod:
 - zapier push
 - pustit to pres web
 - zapier logs --type=http --detailed


Done:
 - vypada to tak, ze klasicky trigger akorat chyta kdyz v listu neco pribyde - pak pry jeste existuje update trigger, co ma v name updated a ten kouka jestli se to zmenilo - k tomu ale neni zadna kloudna dokumentace a asi teda neexistuje
 - pak teda udelat to zaokrouhlovani, idealne i s parametrama
 - vyzkouset jestli to updated chyta fakt updated .. kdyz tak bych tam musel delat nejakou id chytristiku, coz bych nerad
 - uz mam teda prochazejici push, dostava mi to dobre ty aktualni stats.
 - jeste by to chtelo vyresit refreshovani toho tokenu
 - nejspis musis na strave povolit domenu asi
 - upload se poved, je to tam jako Strava 1.0.0 .. hazi to nejakej error co rika neco o bad request invalid redirect uri, kdyz zkusis udelat connect account 

 https://www.strava.com/oauth/authorize?client_id=10060&state=1542295683.9929224&redirect_uri=https%3A%2F%2Fzapier.com%2Fdashboard%2Fauth%2Foauth%2Freturn%2FApp3541CLIAPI%2F&response_type=code&scope=read

