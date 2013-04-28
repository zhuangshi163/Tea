/**
@fileoverview 国内城市数据
@author freyaoo@gmail.com
@version 1.1
*/
KISSY.add('gallery/city-selector/1.1/domestic',function(S){
	'use strict';

	var data = [{"name":"安徽","pinyin":"anhui","spy":"ah","code":"30509","city":[{"name":"安庆","pinyin":"anqing","spy":"aq","code":"45959"},{"name":"蚌埠","pinyin":"bangbu","spy":"bb","code":"45961"},{"name":"亳州","pinyin":"bozhou","spy":"bz","code":"45966"},{"name":"巢湖","pinyin":"chaohu","spy":"ch","code":"45964"},{"name":"滁州","pinyin":"chuzhou","spy":"cz","code":"110249"},{"name":"池州","pinyin":"chizhou","spy":"cz","code":"110252"},{"name":"阜阳","pinyin":"fuyang","spy":"fy","code":"45963"},{"name":"淮北","pinyin":"huaibei","spy":"hb","code":"110247"},{"name":"合肥","pinyin":"hefei","spy":"hf","code":"29413"},{"name":"淮南","pinyin":"huainan","spy":"hn","code":"45962"},{"name":"黄山","pinyin":"huangshan","spy":"hs","code":"38723"},{"name":"六安","pinyin":"liuan","spy":"la","code":"110250"},{"name":"马鞍山","pinyin":"maanshan","spy":"mas","code":"45968"},{"name":"宿州","pinyin":"suzhou","spy":"sz","code":"45965"},{"name":"铜陵","pinyin":"tongling","spy":"tl","code":"110248"},{"name":"芜湖","pinyin":"wuhu","spy":"wh","code":"45960"},{"name":"宣城","pinyin":"xuancheng","spy":"xc","code":"110253"}]},{"name":"北京","pinyin":"beijing","spy":"bj","code":"29400"},{"name":"重庆","pinyin":"chongqing","spy":"cq","code":"29404"},{"name":"福建","pinyin":"fujian","spy":"fj","code":"30519","city":[{"name":"福州","pinyin":"fuzhou","spy":"fz","code":"29406"},{"name":"龙岩","pinyin":"longyan","spy":"ly","code":"82717644"},{"name":"宁德","pinyin":"ningde","spy":"nd","code":"45973"},{"name":"南平","pinyin":"nanping","spy":"np","code":"46213"},{"name":"莆田","pinyin":"putian","spy":"pt","code":"45972"},{"name":"泉州","pinyin":"quanzhou","spy":"qz","code":"38742"},{"name":"厦门","pinyin":"shamen","spy":"sm","code":"29431"},{"name":"三明","pinyin":"sanming","spy":"sm","code":"46212"},{"name":"漳州","pinyin":"zhangzhou","spy":"zz","code":"45975"}]},{"name":"广东","pinyin":"guangdong","spy":"gd","code":"30517","city":[{"name":"潮州","pinyin":"chaozhou","spy":"cz","code":"46008"},{"name":"东莞","pinyin":"dongguan","spy":"dg","code":"84746"},{"name":"佛山","pinyin":"foshan","spy":"fs","code":"31961"},{"name":"广州","pinyin":"guangzhou","spy":"gz","code":"29407"},{"name":"河源","pinyin":"heyuan","spy":"hy","code":"46003"},{"name":"惠州","pinyin":"huizhou","spy":"hz","code":"46000"},{"name":"江门","pinyin":"jiangmen","spy":"jm","code":"45996"},{"name":"揭阳","pinyin":"jieyang","spy":"jy","code":"46009"},{"name":"茂名","pinyin":"maoming","spy":"mm","code":"45998"},{"name":"梅州","pinyin":"meizhou","spy":"mz","code":"46001"},{"name":"清远","pinyin":"qingyuan","spy":"qy","code":"46005"},{"name":"韶关","pinyin":"shaoguan","spy":"sg","code":"45995"},{"name":"汕头","pinyin":"shantou","spy":"st","code":"45994"},{"name":"汕尾","pinyin":"shanwei","spy":"sw","code":"46002"},{"name":"深圳","pinyin":"shenzhen","spy":"sz","code":"29425"},{"name":"云浮","pinyin":"yunfu","spy":"yf","code":"46010"},{"name":"阳江","pinyin":"yangjiang","spy":"yj","code":"46004"},{"name":"珠海","pinyin":"zhuhai","spy":"zh","code":"31960"},{"name":"湛江","pinyin":"zhanjiang","spy":"zj","code":"45997"},{"name":"肇庆","pinyin":"zhaoqing","spy":"zq","code":"45999"},{"name":"中山","pinyin":"zhongshan","spy":"zs","code":"31962"}]},{"name":"甘肃","pinyin":"gansu","spy":"gs","code":"30505","city":[{"name":"白银","pinyin":"baiyin","spy":"by","code":"45985"},{"name":"敦煌","pinyin":"dunhuang","spy":"dh","code":"45989"},{"name":"定西","pinyin":"dingxi","spy":"dx","code":"45986"},{"name":"甘南","pinyin":"gannan","spy":"gn","code":"45992"},{"name":"金昌","pinyin":"jinchang","spy":"jc","code":"45979"},{"name":"酒泉","pinyin":"jiuquan","spy":"jq","code":"45982"},{"name":"嘉峪关","pinyin":"jiayuguan","spy":"jyg","code":"45978"},{"name":"陇南","pinyin":"longnan","spy":"ln","code":"45987"},{"name":"临夏","pinyin":"linxia","spy":"lx","code":"45990"},{"name":"兰州","pinyin":"lanzhou","spy":"lz","code":"29417"},{"name":"平凉","pinyin":"pingliang","spy":"pl","code":"45984"},{"name":"庆阳","pinyin":"qingyang","spy":"qy","code":"45983"},{"name":"天水","pinyin":"tianshui","spy":"ts","code":"45977"},{"name":"武威","pinyin":"wuwei","spy":"ww","code":"45980"},{"name":"张掖","pinyin":"zhangye","spy":"zy","code":"45981"}]},{"name":"广西","pinyin":"guangxi","spy":"gx","code":"30518","city":[{"name":"北海","pinyin":"beihai","spy":"bh","code":"38716"},{"name":"百色","pinyin":"baise","spy":"bs","code":"46018"},{"name":"崇左","pinyin":"chongzuo","spy":"cz","code":"46022"},{"name":"防城港","pinyin":"fangchenggang","spy":"fcg","code":"46014"},{"name":"贵港","pinyin":"guigang","spy":"gg","code":"46016"},{"name":"桂林","pinyin":"guilin","spy":"gl","code":"29408"},{"name":"河池","pinyin":"hechi","spy":"hc","code":"46020"},{"name":"贺州","pinyin":"hezhou","spy":"hz","code":"46019"},{"name":"来宾","pinyin":"laibin","spy":"lb","code":"46021"},{"name":"柳州","pinyin":"liuzhou","spy":"lz","code":"46012"},{"name":"南宁","pinyin":"nanning","spy":"nn","code":"29421"},{"name":"钦州","pinyin":"qinzhou","spy":"qz","code":"46015"},{"name":"梧州","pinyin":"wuzhou","spy":"wz","code":"46013"},{"name":"玉林","pinyin":"yulin","spy":"yl","code":"46017"}]},{"name":"贵州","pinyin":"guizhou","spy":"gz","code":"30516","city":[{"name":"安顺","pinyin":"anshun","spy":"as","code":"82719621"},{"name":"毕节","pinyin":"bijie","spy":"bj","code":"46029"},{"name":"贵阳","pinyin":"guiyang","spy":"gy","code":"29409"},{"name":"六盘水","pinyin":"liupanshui","spy":"lps","code":"46026"},{"name":"黔东南","pinyin":"qiandongnan","spy":"qdn","code":"110231"},{"name":"黔南","pinyin":"qiannan","spy":"qn","code":"110232"},{"name":"黔西南","pinyin":"qianxinan","spy":"qxn","code":"110230"},{"name":"铜仁","pinyin":"tongren","spy":"tr","code":"46027"},{"name":"遵义","pinyin":"zunyi","spy":"zy","code":"46024"}]},{"name":"湖北","pinyin":"hubei","spy":"hb","code":"30513","city":[{"name":"恩施","pinyin":"enshi","spy":"es","code":"46063"},{"name":"鄂州","pinyin":"ezhou","spy":"ez","code":"110236"},{"name":"黄冈","pinyin":"huanggang","spy":"hg","code":"110238"},{"name":"黄石","pinyin":"huangshi","spy":"hs","code":"110235"},{"name":"荆门","pinyin":"jingmen","spy":"jm","code":"46062"},{"name":"荆州","pinyin":"jingzhou","spy":"jz","code":"46058"},{"name":"十堰","pinyin":"shiyan","spy":"sy","code":"46061"},{"name":"随州","pinyin":"suizhou","spy":"sz","code":"110240"},{"name":"武汉","pinyin":"wuhan","spy":"wh","code":"29429"},{"name":"襄樊","pinyin":"xiangfan","spy":"xf","code":"46060"},{"name":"孝感","pinyin":"xiaogan","spy":"xg","code":"110237"},{"name":"咸宁","pinyin":"xianning","spy":"xn","code":"110239"},{"name":"宜昌","pinyin":"yichang","spy":"yc","code":"46059"}]},{"name":"河北","pinyin":"hebei","spy":"hb","code":"30499","city":[{"name":"保定","pinyin":"baoding","spy":"bd","code":"46040"},{"name":"承德","pinyin":"chengde","spy":"cd","code":"38717"},{"name":"沧州","pinyin":"cangzhou","spy":"cz","code":"110288"},{"name":"邯郸","pinyin":"handan","spy":"hd","code":"46042"},{"name":"衡水","pinyin":"hengshui","spy":"hs","code":"46041"},{"name":"廊坊","pinyin":"langfang","spy":"lf","code":"46039"},{"name":"秦皇岛","pinyin":"qinhuangdao","spy":"qhd","code":"46034"},{"name":"石家庄","pinyin":"shijiazhuang","spy":"sjz","code":"29426"},{"name":"唐山","pinyin":"tangshan","spy":"ts","code":"46037"},{"name":"邢台","pinyin":"xingtai","spy":"xt","code":"46036"},{"name":"张家口","pinyin":"zhangjiakou","spy":"zjk","code":"38744"}]},{"name":"黑龙江","pinyin":"heilongjiang","spy":"hlj","code":"30496","city":[{"name":"大庆","pinyin":"daqing","spy":"dq","code":"46055"},{"name":"大兴安岭","pinyin":"daxinganling","spy":"dxal","code":"110299"},{"name":"哈尔滨","pinyin":"haerbin","spy":"heb","code":"29410"},{"name":"鹤岗","pinyin":"hegang","spy":"hg","code":"110295"},{"name":"黑河","pinyin":"heihe","spy":"hh","code":"84742"},{"name":"佳木斯","pinyin":"jiamusi","spy":"jms","code":"84743"},{"name":"鸡西","pinyin":"jixi","spy":"jx","code":"110294"},{"name":"牡丹江","pinyin":"mudanjiang","spy":"mdj","code":"46054"},{"name":"齐齐哈尔","pinyin":"qiqihaer","spy":"qqhe","code":"46056"},{"name":"七台河","pinyin":"qitaihe","spy":"qth","code":"110297"},{"name":"绥化","pinyin":"suihua","spy":"sh","code":"110298"},{"name":"双鸭山","pinyin":"shuangyashan","spy":"sys","code":"110296"},{"name":"伊春","pinyin":"yichun","spy":"yc","code":"84744"}]},{"name":"湖南","pinyin":"hunan","spy":"hn","code":"30514","city":[{"name":"常德","pinyin":"changde","spy":"cd","code":"110224"},{"name":"长沙","pinyin":"changsha","spy":"cs","code":"29402"},{"name":"郴州","pinyin":"chenzhou","spy":"cz","code":"110226"},{"name":"怀化","pinyin":"huaihua","spy":"hh","code":"110228"},{"name":"衡阳","pinyin":"hengyang","spy":"hy","code":"82718143"},{"name":"娄底","pinyin":"loudi","spy":"ld","code":"110229"},{"name":"邵阳","pinyin":"shaoyang","spy":"sy","code":"110222"},{"name":"湘潭","pinyin":"xiangtan","spy":"xt","code":"46067"},{"name":"湘西","pinyin":"xiangxi","spy":"xx","code":"82718147"},{"name":"岳阳","pinyin":"yueyang","spy":"yy","code":"110223"},{"name":"益阳","pinyin":"yiyang","spy":"yy","code":"110225"},{"name":"永州","pinyin":"yongzhou","spy":"yz","code":"110227"},{"name":"张家界","pinyin":"zhangjiajie","spy":"zjj","code":"29436"},{"name":"株洲","pinyin":"zhuzhou","spy":"zz","code":"110220"}]},{"name":"海南","pinyin":"hainan","spy":"hn","code":"30520","city":[{"name":"海口","pinyin":"haikou","spy":"hk","code":"29411"},{"name":"三沙市","pinyin":"sanshashi","spy":"sss","code":"155258206"},{"name":"三亚","pinyin":"sanya","spy":"sy","code":"38732"},{"name":"五指山","pinyin":"wuzhishan","spy":"wzs","code":"57228"},{"name":"兴隆","pinyin":"xinglong","spy":"xl","code":"3278613"}]},{"name":"河南","pinyin":"henan","spy":"hn","code":"30500","city":[{"name":"安阳","pinyin":"anyang","spy":"ay","code":"110280"},{"name":"登封","pinyin":"dengfeng","spy":"df","code":"82717870"},{"name":"鹤壁","pinyin":"hebi","spy":"hb","code":"46051"},{"name":"焦作","pinyin":"jiaozuo","spy":"jz","code":"46052"},{"name":"开封","pinyin":"kaifeng","spy":"kf","code":"46045"},{"name":"漯河","pinyin":"luohe","spy":"lh","code":"131759"},{"name":"洛阳","pinyin":"luoyang","spy":"ly","code":"38729"},{"name":"南阳","pinyin":"nanyang","spy":"ny","code":"46048"},{"name":"平顶山","pinyin":"pingdingshan","spy":"pds","code":"57255"},{"name":"濮阳","pinyin":"puyang","spy":"py","code":"46047"},{"name":"三门峡","pinyin":"sanmenxia","spy":"smx","code":"110283"},{"name":"商丘","pinyin":"shangqiu","spy":"sq","code":"110284"},{"name":"许昌","pinyin":"xuchang","spy":"xc","code":"110281"},{"name":"新乡","pinyin":"xinxiang","spy":"xx","code":"46046"},{"name":"信阳","pinyin":"xinyang","spy":"xy","code":"110285"},{"name":"周口","pinyin":"zhoukou","spy":"zk","code":"110286"},{"name":"驻马店","pinyin":"zhumadian","spy":"zmd","code":"110287"},{"name":"郑州","pinyin":"zhengzhou","spy":"zz","code":"29437"}]},{"name":"吉林","pinyin":"jilin","spy":"jl","code":"30497","city":[{"name":"白城","pinyin":"baicheng","spy":"bc","code":"110293"},{"name":"白山","pinyin":"baishan","spy":"bs","code":"82717105"},{"name":"长春","pinyin":"changchun","spy":"cc","code":"29401"},{"name":"吉林","pinyin":"jilin","spy":"jl","code":"30497"},{"name":"辽源","pinyin":"liaoyuan","spy":"ly","code":"110290"},{"name":"四平","pinyin":"siping","spy":"sp","code":"110289"},{"name":"松原","pinyin":"songyuan","spy":"sy","code":"110292"},{"name":"通化","pinyin":"tonghua","spy":"th","code":"110291"},{"name":"延边","pinyin":"yanbian","spy":"yb","code":"84745"}]},{"name":"江苏","pinyin":"jiangsu","spy":"js","code":"30511","city":[{"name":"常州","pinyin":"changzhou","spy":"cz","code":"31949"},{"name":"淮安","pinyin":"huaian","spy":"ha","code":"46092"},{"name":"连云港","pinyin":"lianyungang","spy":"lyg","code":"31951"},{"name":"南京","pinyin":"nanjing","spy":"nj","code":"29420"},{"name":"南通","pinyin":"nantong","spy":"nt","code":"31948"},{"name":"宿迁","pinyin":"suqian","spy":"sq","code":"108722"},{"name":"苏州","pinyin":"suzhou","spy":"sz","code":"30378"},{"name":"泰州","pinyin":"taizhou","spy":"tz","code":"46084"},{"name":"无锡","pinyin":"wuxi","spy":"wx","code":"31947"},{"name":"徐州","pinyin":"xuzhou","spy":"xz","code":"31950"},{"name":"盐城","pinyin":"yancheng","spy":"yc","code":"46085"},{"name":"扬州","pinyin":"yangzhou","spy":"yz","code":"46078"},{"name":"镇江","pinyin":"zhenjiang","spy":"zj","code":"46079"}]},{"name":"江西","pinyin":"jiangxi","spy":"jx","code":"30512","city":[{"name":"抚州","pinyin":"fuzhou","spy":"fz","code":"110246"},{"name":"赣州","pinyin":"ganzhou","spy":"gz","code":"110243"},{"name":"吉安","pinyin":"jian","spy":"ja","code":"82717706"},{"name":"景德镇","pinyin":"jingdezhen","spy":"jdz","code":"46073"},{"name":"九江","pinyin":"jiujiang","spy":"jj","code":"46072"},{"name":"南昌 NANCHANG","pinyin":"nanchang NANCHANG","spy":"nc NANCHANG","code":"38730"},{"name":"萍乡","pinyin":"pingxiang","spy":"px","code":"46076"},{"name":"上饶(婺源)","pinyin":"shangrao(wuyuan)","spy":"sr(wy)","code":"46074"},{"name":"新余","pinyin":"xinyu","spy":"xy","code":"110241"},{"name":"宜春","pinyin":"yichun","spy":"yc","code":"110245"},{"name":"鹰潭","pinyin":"yingtan","spy":"yt","code":"110242"}]},{"name":"辽宁","pinyin":"liaoning","spy":"ln","code":"30498","city":[{"name":"鞍山","pinyin":"anshan","spy":"as","code":"46104"},{"name":"本溪","pinyin":"benxi","spy":"bx","code":"46106"},{"name":"朝阳","pinyin":"chaoyang","spy":"cy","code":"46110"},{"name":"丹东","pinyin":"dandong","spy":"dd","code":"46103"},{"name":"大连","pinyin":"dalian","spy":"dl","code":"29405"},{"name":"抚顺","pinyin":"fushun","spy":"fs","code":"46107"},{"name":"阜新","pinyin":"fuxin","spy":"fx","code":"46109"},{"name":"葫芦岛","pinyin":"huludao","spy":"hld","code":"46099"},{"name":"锦州","pinyin":"jinzhou","spy":"jz","code":"46100"},{"name":"辽阳","pinyin":"liaoyang","spy":"ly","code":"46105"},{"name":"盘锦","pinyin":"panjin","spy":"pj","code":"46101"},{"name":"沈阳","pinyin":"shenyang","spy":"sy","code":"29424"},{"name":"铁岭","pinyin":"tieling","spy":"tl","code":"46108"},{"name":"营口","pinyin":"yingkou","spy":"yk","code":"46102"}]},{"name":"内蒙古","pinyin":"neimenggu","spy":"nmg","code":"30495","city":[{"name":"阿拉善盟","pinyin":"alashanmeng","spy":"alsm","code":"131754"},{"name":"包头","pinyin":"baotou","spy":"bt","code":"46112"},{"name":"巴彦淖尔","pinyin":"bayannaoer","spy":"byne","code":"46118"},{"name":"赤峰","pinyin":"chifeng","spy":"cf","code":"46114"},{"name":"鄂尔多斯","pinyin":"eerduosi","spy":"eeds","code":"46116"},{"name":"呼和浩特","pinyin":"huhehaote","spy":"hhht","code":"29414"},{"name":"呼伦贝尔","pinyin":"hulunbeier","spy":"hlbe","code":"46117"},{"name":"通辽","pinyin":"tongliao","spy":"tl","code":"46115"},{"name":"乌海","pinyin":"wuhai","spy":"wh","code":"46113"},{"name":"乌兰察布","pinyin":"wulanchabu","spy":"wlcb","code":"46119"},{"name":"兴安盟","pinyin":"xinganmeng","spy":"xam","code":"131752"},{"name":"锡林郭勒盟","pinyin":"xilinguolemeng","spy":"xlglm","code":"131753"}]},{"name":"宁夏","pinyin":"ningxia","spy":"nx","code":"30507","city":[{"name":"固原","pinyin":"guyuan","spy":"gy","code":"46123"},{"name":"石嘴山","pinyin":"shizuishan","spy":"szs","code":"46121"},{"name":"吴忠","pinyin":"wuzhong","spy":"wz","code":"46122"},{"name":"银川","pinyin":"yinchuan","spy":"yc","code":"29434"},{"name":"中卫","pinyin":"zhongwei","spy":"zw","code":"46124"}]},{"name":"青海","pinyin":"qinghai","spy":"qh","code":"30504","city":[{"name":"果洛","pinyin":"guoluo","spy":"gl","code":"110272"},{"name":"海北","pinyin":"haibei","spy":"hb","code":"110270"},{"name":"海东","pinyin":"haidong","spy":"hd","code":"46126"},{"name":"黄南","pinyin":"huangnan","spy":"hn","code":"110271"},{"name":"海南","pinyin":"hainan","spy":"hn","code":"30520"},{"name":"海西","pinyin":"haixi","spy":"hx","code":"110274"},{"name":"西宁","pinyin":"xining","spy":"xn","code":"29433"},{"name":"玉树","pinyin":"yushu","spy":"ys","code":"110273"}]},{"name":"四川","pinyin":"sichuan","spy":"sc","code":"30508","city":[{"name":"阿坝州","pinyin":"abazhou","spy":"abz","code":"82719357"},{"name":"巴中","pinyin":"bazhong","spy":"bz","code":"110260"},{"name":"成都","pinyin":"chengdou","spy":"cd","code":"29403"},{"name":"德阳","pinyin":"deyang","spy":"dy","code":"46173"},{"name":"达州","pinyin":"dazhou","spy":"dz","code":"110257"},{"name":"广安","pinyin":"guangan","spy":"ga","code":"110256"},{"name":"广元","pinyin":"guangyuan","spy":"gy","code":"46175"},{"name":"甘孜州","pinyin":"ganzizhou","spy":"gzz","code":"3297267"},{"name":"乐山","pinyin":"leshan","spy":"ls","code":"38726"},{"name":"凉山州","pinyin":"liangshanzhou","spy":"lsz","code":"3297268"},{"name":"泸州","pinyin":"luzhou","spy":"lz","code":"46172"},{"name":"眉山","pinyin":"meishan","spy":"ms","code":"82719356"},{"name":"绵阳","pinyin":"mianyang","spy":"my","code":"46174"},{"name":"南充","pinyin":"nanchong","spy":"nc","code":"110254"},{"name":"内江","pinyin":"neijiang","spy":"nj","code":"46177"},{"name":"攀枝花","pinyin":"panzhihua","spy":"pzh","code":"46171"},{"name":"遂宁","pinyin":"suining","spy":"sn","code":"46176"},{"name":"雅安","pinyin":"yaan","spy":"ya","code":"110259"},{"name":"宜宾","pinyin":"yibin","spy":"yb","code":"110255"},{"name":"自贡","pinyin":"zigong","spy":"zg","code":"46170"},{"name":"资阳","pinyin":"ziyang","spy":"zy","code":"110261"}]},{"name":"山东","pinyin":"shandong","spy":"sd","code":"30501","city":[{"name":"滨州","pinyin":"binzhou","spy":"bz","code":"46144"},{"name":"东营","pinyin":"dongying","spy":"dy","code":"46136"},{"name":"德州","pinyin":"dezhou","spy":"dz","code":"46138"},{"name":"菏泽","pinyin":"heze","spy":"hz","code":"46142"},{"name":"济南","pinyin":"jinan","spy":"jn","code":"29415"},{"name":"济宁","pinyin":"jining","spy":"jn","code":"110278"},{"name":"聊城","pinyin":"liaocheng","spy":"lc","code":"46143"},{"name":"莱芜","pinyin":"laiwu","spy":"lw","code":"110279"},{"name":"临沂","pinyin":"linyi","spy":"ly","code":"46137"},{"name":"青岛","pinyin":"qingdao","spy":"qd","code":"29422"},{"name":"日照","pinyin":"rizhao","spy":"rz","code":"46141"},{"name":"泰安","pinyin":"taian","spy":"ta","code":"82717789"},{"name":"潍坊","pinyin":"weifang","spy":"wf","code":"46134"},{"name":"威海","pinyin":"weihai","spy":"wh","code":"38734"},{"name":"烟台","pinyin":"yantai","spy":"yt","code":"38738"},{"name":"淄博","pinyin":"zibo","spy":"zb","code":"46135"},{"name":"枣庄","pinyin":"zaozhuang","spy":"zz","code":"110277"}]},{"name":"上海","pinyin":"shanghai","spy":"sh","code":"29423"},{"name":"山西","pinyin":"shanxi","spy":"sx","code":"30502","city":[{"name":"长治","pinyin":"changzhi","spy":"cz","code":"46153"},{"name":"大同","pinyin":"datong","spy":"dt","code":"46150"},{"name":"晋城","pinyin":"jincheng","spy":"jc","code":"46154"},{"name":"晋中","pinyin":"jinzhong","spy":"jz","code":"110275"},{"name":"临汾","pinyin":"linfen","spy":"lf","code":"46155"},{"name":"吕梁","pinyin":"lu:liang","spy":"ll","code":"110276"},{"name":"平遥","pinyin":"pingyao","spy":"py","code":"8517582"},{"name":"朔州","pinyin":"shuozhou","spy":"sz","code":"46158"},{"name":"太原","pinyin":"taiyuan","spy":"ty","code":"29427"},{"name":"忻州","pinyin":"xinzhou","spy":"xz","code":"46159"},{"name":"运城","pinyin":"yuncheng","spy":"yc","code":"46157"},{"name":"阳泉","pinyin":"yangquan","spy":"yq","code":"46151"}]},{"name":"陕西","pinyin":"shanxi","spy":"sx","code":"30503","city":[{"name":"安康","pinyin":"ankang","spy":"ak","code":"46167"},{"name":"宝鸡","pinyin":"baoji","spy":"bj","code":"46162"},{"name":"汉中","pinyin":"hanzhong","spy":"hz","code":"46165"},{"name":"商洛","pinyin":"shangluo","spy":"sl","code":"46168"},{"name":"铜川","pinyin":"tongchuan","spy":"tc","code":"46161"},{"name":"渭南","pinyin":"weinan","spy":"wn","code":"82720044"},{"name":"西安","pinyin":"xian","spy":"xa","code":"29432"},{"name":"咸阳","pinyin":"xianyang","spy":"xy","code":"46163"},{"name":"延安","pinyin":"yanan","spy":"ya","code":"38739"},{"name":"榆林","pinyin":"yulin","spy":"yl","code":"46166"}]},{"name":"天津","pinyin":"tianjin","spy":"tj","code":"29428"},{"name":"新疆","pinyin":"xinjiang","spy":"xj","code":"30506","city":[{"name":"阿克苏","pinyin":"akesu","spy":"aks","code":"46189"},{"name":"阿勒泰","pinyin":"aletai","spy":"alt","code":"46197"},{"name":"博尔塔拉","pinyin":"boertala","spy":"betl","code":"110268"},{"name":"巴音郭楞","pinyin":"bayinguoleng","spy":"bygl","code":"110266"},{"name":"昌吉","pinyin":"changji","spy":"cj","code":"110267"},{"name":"哈密","pinyin":"hami","spy":"hm","code":"46187"},{"name":"和田","pinyin":"hetian","spy":"ht","code":"46188"},{"name":"克拉玛依","pinyin":"kelamayi","spy":"klmy","code":"46186"},{"name":"喀什","pinyin":"kashen","spy":"ks","code":"46190"},{"name":"克孜勒苏","pinyin":"kezilesu","spy":"kzls","code":"110265"},{"name":"塔城","pinyin":"tacheng","spy":"tc","code":"46196"},{"name":"吐鲁番","pinyin":"tulufan","spy":"tlf","code":"38733"},{"name":"乌鲁木齐","pinyin":"wulumuqi","spy":"wlmq","code":"29430"},{"name":"伊犁","pinyin":"yili","spy":"yl","code":"20328"}]},{"name":"西藏","pinyin":"xizang","spy":"xz","code":"27009","city":[{"name":"阿里","pinyin":"ali","spy":"al","code":"46183"},{"name":"昌都","pinyin":"changdou","spy":"cd","code":"46179"},{"name":"拉萨","pinyin":"lasa","spy":"ls","code":"29418"},{"name":"林芝","pinyin":"linzhi","spy":"lz","code":"46184"},{"name":"那曲","pinyin":"neiqu","spy":"nq","code":"46182"},{"name":"日喀则","pinyin":"rikaze","spy":"rkz","code":"46181"},{"name":"山南","pinyin":"shannan","spy":"sn","code":"46180"}]},{"name":"云南","pinyin":"yunnan","spy":"yn","code":"30515","city":[{"name":"KPC/昆明","pinyin":"KPC/kunming","spy":"KPC/km","code":"29416"},{"name":"保山","pinyin":"baoshan","spy":"bs","code":"46201"},{"name":"楚雄","pinyin":"chuxiong","spy":"cx","code":"46207"},{"name":"德宏","pinyin":"dehong","spy":"dh","code":"46208"},{"name":"大理","pinyin":"dali","spy":"dl","code":"38718"},{"name":"迪庆","pinyin":"diqing","spy":"dq","code":"82719678"},{"name":"红河","pinyin":"honghe","spy":"hh","code":"46206"},{"name":"临沧","pinyin":"lincang","spy":"lc","code":"46204"},{"name":"泸沽湖","pinyin":"luguhu","spy":"lgh","code":"17955681"},{"name":"丽江","pinyin":"lijiang","spy":"lj","code":"29419"},{"name":"怒江","pinyin":"nujiang","spy":"nj","code":"110234"},{"name":"普洱","pinyin":"puer","spy":"pe","code":"110233"},{"name":"曲靖","pinyin":"qujing","spy":"qj","code":"46199"},{"name":"文山","pinyin":"wenshan","spy":"ws","code":"46205"},{"name":"西双版纳","pinyin":"xishuangbanna","spy":"xsbn","code":"38736"},{"name":"玉溪","pinyin":"yuxi","spy":"yx","code":"46200"},{"name":"昭通","pinyin":"zhaotong","spy":"zt","code":"46202"}]},{"name":"浙江","pinyin":"zhejiang","spy":"zj","code":"30510","city":[{"name":"Cheerday/千岛湖","pinyin":"Cheerday/qiandaohu","spy":"Cheerday/qdh","code":"57362"},{"name":"杭州","pinyin":"hangzhou","spy":"hz","code":"29412"},{"name":"湖州","pinyin":"huzhou","spy":"hz","code":"31955"},{"name":"金华","pinyin":"jinhua","spy":"jh","code":"31953"},{"name":"嘉兴（乌镇/西塘）","pinyin":"jiaxing（wuzhen/xitang）","spy":"jx（wz/xt）","code":"31956"},{"name":"丽水","pinyin":"lishui","spy":"ls","code":"31959"},{"name":"宁波","pinyin":"ningbo","spy":"nb","code":"30379"},{"name":"衢州","pinyin":"quzhou","spy":"qz","code":"46210"},{"name":"绍兴","pinyin":"shaoxing","spy":"sx","code":"31954"},{"name":"台州","pinyin":"taizhou","spy":"tz","code":"31958"},{"name":"温州","pinyin":"wenzhou","spy":"wz","code":"82717293"},{"name":"舟山","pinyin":"zhoushan","spy":"zs","code":"82717294"}]}];

	return data;
});/**
@fileoverview 国际城市数据
@author freyaoo@gmail.com
@version 1.1
*/
KISSY.add('gallery/city-selector/1.1/foreign',function(S){
	'use strict';

	var data = [{"name":"奥地利","pinyin":"aodili","spy":"adl","code":"3909606"},{"name":"澳大利亚","pinyin":"aodaliya","spy":"adly","code":"27015","city":[{"name":"阿德莱德","pinyin":"adelaide","spy":"adld","code":"3300645"},{"name":"贝尔湾","pinyin":"beierwan","spy":"bew","code":"220424059"},{"name":"布里斯班","pinyin":"bulisiban","spy":"blsb","code":"3299825"},{"name":"弗里曼特尔","pinyin":"fulimanteer","spy":"flmte","code":"220422088"},{"name":"墨尔本","pinyin":"moerben","spy":"meb","code":"3231855"},{"name":"纽卡斯尔","pinyin":"niukasier","spy":"nkse","code":"3301060"},{"name":"珀斯","pinyin":"posi","spy":"ps","code":"3302048"},{"name":"汤斯维尔","pinyin":"tangsiweier","spy":"tswe","code":"220404884"},{"name":"悉尼","pinyin":"xini","spy":"xn","code":"3231834"}]},{"name":"阿尔巴尼亚","pinyin":"aerbaniya","spy":"aebny","code":"37630922"},{"name":"阿尔及利亚","pinyin":"aerjiliya","spy":"aejly","code":"8356172"},{"name":"爱尔兰","pinyin":"aierlan","spy":"ael","code":"39487"},{"name":"阿富汗","pinyin":"afuhan","spy":"afh","code":"107978"},{"name":"安哥拉","pinyin":"angela","spy":"agl","code":"3611735"},{"name":"阿根廷","pinyin":"agenting","spy":"agt","code":"39273"},{"name":"埃及","pinyin":"aiji","spy":"aj","code":"3357616"},{"name":"阿联酋","pinyin":"alianqiu","spy":"alq","code":"4003960","city":[{"name":"阿布扎比","pinyin":"abuzhabi","spy":"abzb","code":"3299612"},{"name":"阿治曼","pinyin":"azhiman","spy":"azm","code":"220428024"},{"name":"迪拜","pinyin":"dibai","spy":"db","code":"3231861"},{"name":"富查伊拉","pinyin":"fuchayila","spy":"fcyl","code":"220412586"},{"name":"哈伊马角","pinyin":"hayimajiao","spy":"hymj","code":"220424157"},{"name":"沙迦","pinyin":"shajia","spy":"sj","code":"3231853"},{"name":"乌姆盖万","pinyin":"wumugaiwan","spy":"wmgw","code":"220416347"}]},{"name":"阿曼","pinyin":"aman","spy":"am","code":"7798360"},{"name":"澳门","pinyin":"aomen","spy":"am","code":"29121"},{"name":"阿塞拜疆","pinyin":"asaibaijiang","spy":"asbj","code":"32401930"},{"name":"埃塞俄比亚","pinyin":"aisaiebiya","spy":"aseby","code":"23559851"},{"name":"巴布亚新几内亚","pinyin":"babuyaxinjineiya","spy":"bbyxjny","code":"37630942"},{"name":"博茨瓦纳","pinyin":"bociwana","spy":"bcwn","code":"37630933"},{"name":"冰岛","pinyin":"bingdao","spy":"bd","code":"3617288"},{"name":"波黑","pinyin":"bohei","spy":"bh","code":"25639632"},{"name":"保加利亚","pinyin":"baojialiya","spy":"bjly","code":"3284903"},{"name":"巴基斯坦","pinyin":"bajisitan","spy":"bjst","code":"3300979"},{"name":"波兰","pinyin":"bolan","spy":"bl","code":"3857691"},{"name":"巴林","pinyin":"balin","spy":"bl","code":"3300964"},{"name":"比利时","pinyin":"bilishi","spy":"bls","code":"3620977"},{"name":"玻利维亚","pinyin":"boliweiya","spy":"blwy","code":"53000"},{"name":"北美洲其他国家","pinyin":"beimeizhouqitaguojia","spy":"bmzqtgj","code":"82284436"},{"name":"贝宁","pinyin":"beining","spy":"bn","code":"8491678"},{"name":"巴西","pinyin":"baxi","spy":"bx","code":"39272"},{"name":"赤道几内亚","pinyin":"chidaojineiya","spy":"cdjny","code":"34050683"},{"name":"朝鲜","pinyin":"chaoxian","spy":"cx","code":"10961557"},{"name":"多哥","pinyin":"duoge","spy":"dg","code":"14700468"},{"name":"德国","pinyin":"deguo","spy":"dg","code":"27413"},{"name":"丹麦","pinyin":"danmai","spy":"dm","code":"39486"},{"name":"大溪地","pinyin":"daxidi","spy":"dxd","code":"3394638"},{"name":"大洋洲其他国家","pinyin":"dayangzhouqitaguojia","spy":"dyzqtgj","code":"82284438"},{"name":"厄瓜多尔","pinyin":"eguaduoer","spy":"egde","code":"21643311"},{"name":"俄罗斯","pinyin":"eluosi","spy":"els","code":"3314460","city":[{"name":"符拉迪沃斯托克","pinyin":"fuladiwosituoke","spy":"fldwstk","code":"7260553"},{"name":"喀山","pinyin":"kashan","spy":"ks","code":"95566259"},{"name":"莫斯科","pinyin":"mosike","spy":"msk","code":"3231845"},{"name":"圣彼得堡","pinyin":"shengbidebao","spy":"sbdb","code":"3299355"},{"name":"索契","pinyin":"suoqi","spy":"sq","code":"20593948"},{"name":"新西伯利亚","pinyin":"xinxiboliya","spy":"xxbly","code":"3632303"},{"name":"叶卡捷琳堡","pinyin":"yekajielinbao","spy":"ykjlb","code":"30557029"}]},{"name":"厄立特里亚","pinyin":"eliteliya","spy":"eltly","code":"37630934"},{"name":"法国","pinyin":"faguo","spy":"fg","code":"27412","city":[{"name":"波尔多","pinyin":"boerduo","spy":"bed","code":"3346688"},{"name":"巴黎","pinyin":"bali","spy":"bl","code":"3299349"},{"name":"里昂","pinyin":"liang","spy":"la","code":"3299328"},{"name":"里尔","pinyin":"lier","spy":"le","code":"18381621"},{"name":"马赛","pinyin":"masai","spy":"ms","code":"3301088"},{"name":"尼斯","pinyin":"nisi","spy":"ns","code":"3231823"},{"name":"南特","pinyin":"nante","spy":"nt","code":"3299348"}]},{"name":"斐济","pinyin":"feiji","spy":"fj","code":"3907207"},{"name":"芬兰","pinyin":"fenlan","spy":"fl","code":"43785"},{"name":"菲律宾","pinyin":"feilu:bin","spy":"flb","code":"3286564","city":[{"name":"达沃","pinyin":"dawo","spy":"dw","code":"6950301"},{"name":"奎松城","pinyin":"kuisongcheng","spy":"ksc","code":"218916463"},{"name":"马尼拉","pinyin":"manila","spy":"mnl","code":"3231854"},{"name":"宿务","pinyin":"suwu","spy":"sw","code":"137946539"},{"name":"长滩岛","pinyin":"zhangtandao","spy":"ztd","code":"3985066"}]},{"name":"非洲其他国家","pinyin":"feizhouqitaguojia","spy":"fzqtgj","code":"82284439"},{"name":"古巴","pinyin":"guba","spy":"gb","code":"52995"},{"name":"刚果","pinyin":"gangguo","spy":"gg","code":"37630935"},{"name":"哥伦比亚","pinyin":"gelunbiya","spy":"glby","code":"52996"},{"name":"哥斯达黎加","pinyin":"gesidalijia","spy":"gsdlj","code":"94581"},{"name":"圭亚那","pinyin":"guiyanei","spy":"gyn","code":"5274544"},{"name":"韩国","pinyin":"hanguo","spy":"hg","code":"27019"},{"name":"荷兰","pinyin":"helan","spy":"hl","code":"39274"},{"name":"哈萨克斯坦","pinyin":"hasakesitan","spy":"hskst","code":"6849343"},{"name":"津巴布韦","pinyin":"jinbabuwei","spy":"jbbw","code":"8059156"},{"name":"吉尔吉斯斯坦","pinyin":"jierjisisitan","spy":"jejsst","code":"37281513"},{"name":"捷克","pinyin":"jieke","spy":"jk","code":"3281850"},{"name":"加纳","pinyin":"jiana","spy":"jn","code":"3301212"},{"name":"加拿大","pinyin":"jianada","spy":"jnd","code":"27410"},{"name":"加蓬","pinyin":"jiapeng","spy":"jp","code":"37630926"},{"name":"柬埔寨","pinyin":"jianpuzhai","spy":"jpz","code":"4053742","city":[{"name":"白马市","pinyin":"baimashi","spy":"bms","code":"220402666"},{"name":"磅真市","pinyin":"bangzhenshi","spy":"bzs","code":"220400721"},{"name":"贡布","pinyin":"gongbu","spy":"gb","code":"215106874"},{"name":"金边市","pinyin":"jinbianshi","spy":"jbs","code":"220412285"},{"name":"桔井市","pinyin":"jiejingshi","spy":"jjs","code":"220402665"},{"name":"蒙多吉利市","pinyin":"mengduojilishi","spy":"mdjls","code":"220412287"},{"name":"马德旺市","pinyin":"madewangshi","spy":"mdws","code":"220414150"},{"name":"西哈努克市","pinyin":"xihanukeshi","spy":"xhnks","code":"220396849"},{"name":"暹粒市","pinyin":"xianlishi","spy":"xls","code":"220412286"}]},{"name":"克罗地亚","pinyin":"keluodiya","spy":"kldy","code":"3753248"},{"name":"喀麦隆","pinyin":"kamailong","spy":"kml","code":"3302683"},{"name":"肯尼亚","pinyin":"kenniya","spy":"kny","code":"119853"},{"name":"卡塔尔","pinyin":"kataer","spy":"kte","code":"3308734"},{"name":"科威特","pinyin":"keweite","spy":"kwt","code":"3300961"},{"name":"利比里亚","pinyin":"libiliya","spy":"lbly","code":"37630927"},{"name":"黎巴嫩","pinyin":"libanen","spy":"lbn","code":"17828418"},{"name":"利比亚","pinyin":"libiya","spy":"lby","code":"37630936"},{"name":"罗马尼亚","pinyin":"luomaniya","spy":"lmny","code":"9363119"},{"name":"卢森堡","pinyin":"lusenbao","spy":"lsb","code":"4004107"},{"name":"立陶宛","pinyin":"litaowan","spy":"ltw","code":"16245445"},{"name":"老挝","pinyin":"laowo","spy":"lw","code":"7717221","city":[{"name":"琅勃拉邦","pinyin":"langbolabang","spy":"lblb","code":"24291548"},{"name":"沙湾","pinyin":"shawan","spy":"sw","code":"7554315"},{"name":"万荣","pinyin":"wanrong","spy":"wr","code":"16619593"},{"name":"万象","pinyin":"wanxiang","spy":"wx","code":"3233370"}]},{"name":"缅甸","pinyin":"miandian","spy":"md","code":"3936150","city":[{"name":"勃生","pinyin":"bosheng","spy":"bs","code":"119511096"},{"name":"东枝","pinyin":"dongzhi","spy":"dz","code":"94276646"},{"name":"腊戍","pinyin":"lashu","spy":"ls","code":"220414327"},{"name":"曼德勒","pinyin":"mandele","spy":"mdl","code":"3630501"},{"name":"密支那","pinyin":"mizhinei","spy":"mzn","code":"42771355"},{"name":"内比都","pinyin":"neibidou","spy":"nbd","code":"220398980"},{"name":"实皆","pinyin":"shijie","spy":"sj","code":"220416205"},{"name":"仰光","pinyin":"yangguang","spy":"yg","code":"3300683"}]},{"name":"马达加斯加","pinyin":"madajiasijia","spy":"mdjsj","code":"3336649"},{"name":"马尔代夫","pinyin":"maerdaifu","spy":"medf","code":"3299559","city":[{"name":"安娜塔拉吉哈瓦/Anantara Kihavah","pinyin":"annatalajihawa/Anantara Kihavah","spy":"antljhw/Anantara Kihavah","code":"218920386"},{"name":"安娜塔拉薇莉笛古岛/Anantara Veli Dhigu","pinyin":"annatalaweilidigudao/Anantara Veli Dhigu","spy":"antlwldgd/Anantara Veli Dhigu","code":"218932326"},{"name":"阿雅达/AYADA","pinyin":"ayada/AYADA","spy":"ayd/AYADA","code":"218936012"},{"name":"波杜希蒂/Coco Palm Bodu Hithi","pinyin":"boduxidi/Coco Palm Bodu Hithi","spy":"bdxd/Coco Palm Bodu Hithi","code":"218914840"},{"name":"白金岛/Hudhuranfushi","pinyin":"baijindao/Hudhuranfushi","spy":"bjd/Hudhuranfushi","code":"218916582"},{"name":"巴洛斯/Baros","pinyin":"baluosi/Baros","spy":"bls/Baros","code":"218922365"},{"name":"杜妮可鲁/Dhuni Kolhu","pinyin":"dunikelu/Dhuni Kolhu","spy":"dnkl/Dhuni Kolhu","code":"218914843"},{"name":"迪娃岛/LUX*","pinyin":"diwadao/LUX*","spy":"dwd/LUX*","code":"218920407"},{"name":"都喜天阙/Dusit Thani","pinyin":"douxitianque/Dusit Thani","spy":"dxtq/Dusit Thani","code":"218920402"},{"name":"芙花芬/Huvafen","pinyin":"fuhuafen/Huvafen","spy":"fhf/Huvafen","code":"218932148"},{"name":"菲利西奥/Filitheyo","pinyin":"feilixiao/Filitheyo","spy":"flxa/Filitheyo","code":"218930155"},{"name":"港丽岛/Conrad Rangali","pinyin":"ganglidao/Conrad Rangali","spy":"gld/Conrad Rangali","code":"218920408"},{"name":"康杜玛/Kandooma","pinyin":"kangduma/Kandooma","spy":"kdm/Kandooma","code":"218926318"},{"name":"库拉玛蒂/Kuramathi","pinyin":"kulamadi/Kuramathi","spy":"klmd/Kuramathi","code":"218910974"},{"name":"卡尼岛/Club Med Kani","pinyin":"kanidao/Club Med Kani","spy":"knd/Club Med Kani","code":"218924314"},{"name":"鲁滨逊岛/Club Robinson","pinyin":"lubinxundao/Club Robinson","spy":"lbxd/Club Robinson","code":"218920412"},{"name":"莉莉岛/Lily Beach","pinyin":"lilidao/Lily Beach","spy":"lld/Lily Beach","code":"218912993"},{"name":"蓝色美人蕉/Thulhagiri","pinyin":"lansemeirenjiao/Thulhagiri","spy":"lsmrj/Thulhagiri","code":"218922370"},{"name":"蓝湾半岛/Herathera","pinyin":"lanwanbandao/Herathera","spy":"lwbd/Herathera","code":"218924318"},{"name":"曼德芙/Medhufushi","pinyin":"mandefu/Medhufushi","spy":"mdf/Medhufushi","code":"218914852"},{"name":"蜜杜帕茹/Meedhupparu","pinyin":"miduparu/Meedhupparu","spy":"mdpr/Meedhupparu","code":"218934107"},{"name":"慕芙士/Moofushi","pinyin":"mufushi/Moofushi","spy":"mfs/Moofushi","code":"218936011"},{"name":"梦幻岛/Dhonveli","pinyin":"menghuandao/Dhonveli","spy":"mhd/Dhonveli","code":"218924319"},{"name":"魅力岛哈库拉/Chaaya Hakura","pinyin":"meilidaohakula/Chaaya Hakura","spy":"mldhkl/Chaaya Hakura","code":"218934106"},{"name":"玛娜法鲁/Waldorf Astoria","pinyin":"manafalu/Waldorf Astoria","spy":"mnfl/Waldorf Astoria","code":"218928320"},{"name":"满月岛/Fullmoon Sheraton","pinyin":"manyuedao/Fullmoon Sheraton","spy":"myd/Fullmoon Sheraton","code":"218934103"},{"name":"宁静岛/W Retreat&Spa","pinyin":"ningjingdao/W Retreat&Spa","spy":"njd/W Retreat&Spa","code":"218924285"},{"name":"尼亚美/Niyama","pinyin":"niyamei/Niyama","spy":"nym/Niyama","code":"218932167"},{"name":"四季库达呼拉/Fourseasons Kuda Hura","pinyin":"sijikudahula/Fourseasons Kuda Hura","spy":"sjkdhl/Fourseasons Kuda Hura","code":"218910966"},{"name":"四季兰达吉拉瓦鲁/Fourseasons Landaa Giravaru","pinyin":"sijilandajilawalu/Fourseasons Landaa Giravaru","spy":"sjldjlwl/Fourseasons Landaa Giravaru","code":"218934097"},{"name":"索尼娃姬丽/Soneva Gili","pinyin":"suoniwajili/Soneva Gili","spy":"snwjl/Soneva Gili","code":"218926290"},{"name":"神仙珊瑚/Island Hideaway","pinyin":"shenxianshanhu/Island Hideaway","spy":"sxsh/Island Hideaway","code":"218918552"},{"name":"双鱼岛/Olhuveli","pinyin":"shuangyudao/Olhuveli","spy":"syd/Olhuveli","code":"218924316"},{"name":"泰姬魅力/Taj Exotica","pinyin":"taijimeili/Taj Exotica","spy":"tjml/Taj Exotica","code":"218924309"},{"name":"泰姬珊瑚/Taj Vivanta","pinyin":"taijishanhu/Taj Vivanta","spy":"tjsh/Taj Vivanta","code":"218918563"},{"name":"瓦度岛/Vadoo","pinyin":"wadudao/Vadoo","spy":"wdd/Vadoo","code":"218910972"},{"name":"薇露丽芙/Vilu Reef","pinyin":"weilulifu/Vilu Reef","spy":"wllf/Vilu Reef","code":"218924324"},{"name":"薇拉莎露/Velassaru","pinyin":"weilashalu/Velassaru","spy":"wlsl/Velassaru","code":"218932173"},{"name":"唯一瑞提拉/One&Only Reethi Raah","pinyin":"weiyiruitila/One&Only Reethi Raah","spy":"wyrtl/One&Only Reethi Raah","code":"218908990"},{"name":"希尔顿伊露岛/Hilton Irufushi","pinyin":"xierdunyiludao/Hilton Irufushi","spy":"xedyld/Hilton Irufushi","code":"218934104"},{"name":"香格里拉薇宁姬丽/Shangri-la Villingili","pinyin":"xianggelilaweiningjili/Shangri-la Villingili","spy":"xgllwnjl/Shangri-la Villingili","code":"218916576"},{"name":"绚丽岛/Club Rannalhi","pinyin":"xuanlidao/Club Rannalhi","spy":"xld/Club Rannalhi","code":"218924320"},{"name":"悦椿薇拉瓦鲁/Angsana Velavaru","pinyin":"yuechunweilawalu/Angsana Velavaru","spy":"ycwlwl/Angsana Velavaru","code":"218926313"},{"name":"悦椿伊瑚鲁/Angsana Ihuru","pinyin":"yuechunyihulu/Angsana Ihuru","spy":"ycyhl/Angsana Ihuru","code":"218924315"},{"name":"悦榕庄瓦宾法鲁/Banyantree Vabbinfaru","pinyin":"yuerongzhuangwabinfalu/Banyantree Vabbinfaru","spy":"yrzwbfl/Banyantree Vabbinfaru","code":"218914839"},{"name":"椰子岛/Kurumba","pinyin":"yezidao/Kurumba","spy":"yzd/Kurumba","code":"218936157"},{"name":"总督岛/Viceroy","pinyin":"zongdudao/Viceroy","spy":"zdd/Viceroy","code":"218914827"},{"name":"卓美亚德瓦纳芙士/Jumeirah Dhevanafushi","pinyin":"zhuomeiyadewanafushi/Jumeirah Dhevanafushi","spy":"zmydwnfs/Jumeirah Dhevanafushi","code":"218926306"},{"name":"卓美亚薇塔薇莉/Jumeirah Vittaveli","pinyin":"zhuomeiyaweitaweili/Jumeirah Vittaveli","spy":"zmywtwl/Jumeirah Vittaveli","code":"218932147"},{"name":"钻石岛/Diamond A/T","pinyin":"zuanshidao/Diamond A/T","spy":"zsd/Diamond A/T","code":"218912994"},{"name":"中央格兰德森特拉/Centara Grand","pinyin":"zhongyanggelandesentela/Centara Grand","spy":"zygldstl/Centara Grand","code":"218936015"}]},{"name":"美国","pinyin":"meiguo","spy":"mg","code":"27409","city":[{"name":"阿拉斯加","pinyin":"alasijia","spy":"alsj","code":"38305"},{"name":"波士顿","pinyin":"boshidun","spy":"bsd","code":"3231848"},{"name":"丹佛","pinyin":"danfo","spy":"df","code":"3300709"},{"name":"底特律","pinyin":"ditelu:","spy":"dtl","code":"3231828"},{"name":"费城","pinyin":"feicheng","spy":"fc","code":"3300762"},{"name":"华盛顿","pinyin":"huashengdun","spy":"hsd","code":"3300550"},{"name":"旧金山","pinyin":"jiujinshan","spy":"jjs","code":"32031"},{"name":"洛杉矶","pinyin":"luoshanji","spy":"lsj","code":"32027"},{"name":"诺福克","pinyin":"nuofuke","spy":"nfk","code":"4068565"},{"name":"纽约","pinyin":"niuyue","spy":"ny","code":"32028"},{"name":"匹兹堡","pinyin":"pizibao","spy":"pzb","code":"3300759"},{"name":"新奥尔良","pinyin":"xinaoerliang","spy":"xael","code":"3328385"},{"name":"休斯敦","pinyin":"xiusidun","spy":"xsd","code":"7170113"},{"name":"夏威夷","pinyin":"xiaweiyi","spy":"xwy","code":"58213"},{"name":"西雅图","pinyin":"xiyatu","spy":"xyt","code":"3300991"},{"name":"盐湖城","pinyin":"yanhucheng","spy":"yhc","code":"3872941"},{"name":"芝加哥","pinyin":"zhijiage","spy":"zjg","code":"3231832"}]},{"name":"蒙古","pinyin":"menggu","spy":"mg","code":"4383995"},{"name":"孟加拉国","pinyin":"mengjialaguo","spy":"mjlg","code":"30407041"},{"name":"马里","pinyin":"mali","spy":"ml","code":"29066736"},{"name":"秘鲁","pinyin":"milu","spy":"ml","code":"52999"},{"name":"毛里求斯","pinyin":"maoliqiusi","spy":"mlqs","code":"3300942","city":[{"name":"鸠比","pinyin":"jiubi","spy":"jb","code":"220398968"},{"name":"卡特邦","pinyin":"katebang","spy":"ktb","code":"126072016"},{"name":"路易港","pinyin":"luyigang","spy":"lyg","code":"17565054"}]},{"name":"毛里塔尼亚","pinyin":"maolitaniya","spy":"mltny","code":"37630938"},{"name":"马来西亚","pinyin":"malaixiya","spy":"mlxy","code":"3286452","city":[{"name":"槟城","pinyin":"bincheng","spy":"bc","code":"3313191"},{"name":"关丹","pinyin":"guandan","spy":"gd","code":"3327820"},{"name":"吉隆坡","pinyin":"jilongpo","spy":"jlp","code":"3231837"},{"name":"兰卡威","pinyin":"lankawei","spy":"lkw","code":"3311320"},{"name":"马六甲","pinyin":"maliujia","spy":"mlj","code":"4180814"},{"name":"新山","pinyin":"xinshan","spy":"xs","code":"3619650"},{"name":"怡保","pinyin":"yibao","spy":"yb","code":"119856"}]},{"name":"莫桑比克","pinyin":"mosangbike","spy":"msbk","code":"37630939"},{"name":"墨西哥","pinyin":"moxige","spy":"mxg","code":"52992"},{"name":"尼泊尔","pinyin":"niboer","spy":"nbe","code":"3793613","city":[{"name":"巴德岗","pinyin":"badegang","spy":"bdg","code":"220416067"},{"name":"巴德拉普尔","pinyin":"badelapuer","spy":"bdlpe","code":"220402704"},{"name":"加德满都","pinyin":"jiademandou","spy":"jdmd","code":"3300934"},{"name":"帕坦","pinyin":"patan","spy":"pt","code":"151185818"},{"name":"伊拉姆","pinyin":"yilamu","spy":"ylm","code":"127418281"}]},{"name":"南非","pinyin":"nanfei","spy":"nf","code":"3274954"},{"name":"南极","pinyin":"nanji","spy":"nj","code":"3283820"},{"name":"纳米比亚","pinyin":"namibiya","spy":"nmby","code":"29364250"},{"name":"南美洲其他国家","pinyin":"nanmeizhouqitaguojia","spy":"nmzqtgj","code":"82284437"},{"name":"尼日尔","pinyin":"nirier","spy":"nre","code":"37630928"},{"name":"尼日利亚","pinyin":"niriliya","spy":"nrly","code":"3302689"},{"name":"欧洲其他国家","pinyin":"ouzhouqitaguojia","spy":"ozqtgj","code":"82284435"},{"name":"葡萄牙","pinyin":"putaoya","spy":"pty","code":"39276"},{"name":"日本","pinyin":"riben","spy":"rb","code":"27023","city":[{"name":"KEER/千叶","pinyin":"KEER/qianye","spy":"KEER/qy","code":"3830529"},{"name":"冲绳","pinyin":"chongsheng","spy":"cs","code":"3301153"},{"name":"大阪","pinyin":"daban","spy":"db","code":"3300916"},{"name":"东京","pinyin":"dongjing","spy":"dj","code":"32032"},{"name":"福山","pinyin":"fushan","spy":"fs","code":"6256825"},{"name":"宫崎","pinyin":"gongqi","spy":"gq","code":"6818597"},{"name":"函馆","pinyin":"hanguan","spy":"hg","code":"6818311"},{"name":"京都","pinyin":"jingdou","spy":"jd","code":"116959"},{"name":"名古屋","pinyin":"mingguwu","spy":"mgw","code":"3231844"},{"name":"奈良","pinyin":"nailiang","spy":"nl","code":"4423678"},{"name":"神户","pinyin":"shenhu","spy":"sh","code":"7205255"},{"name":"神奈川","pinyin":"shennaichuan","spy":"snc","code":"22452725"},{"name":"长崎","pinyin":"zhangqi","spy":"zq","code":"3231843"}]},{"name":"瑞典","pinyin":"ruidian","spy":"rd","code":"27415"},{"name":"瑞士","pinyin":"ruishi","spy":"rs","code":"3255100"},{"name":"苏丹","pinyin":"sudan","spy":"sd","code":"12281302"},{"name":"斯洛伐克","pinyin":"siluofake","spy":"slfk","code":"37630929"},{"name":"塞拉利昂","pinyin":"sailaliang","spy":"slla","code":"37630930"},{"name":"斯里兰卡","pinyin":"sililanka","spy":"sllk","code":"3300947"},{"name":"索马里","pinyin":"suomali","spy":"sml","code":"12551170"},{"name":"塞舌尔","pinyin":"saisheer","spy":"sse","code":"6528826"},{"name":"沙特阿拉伯","pinyin":"shatealabo","spy":"stalb","code":"6307773"},{"name":"土耳其","pinyin":"tuerqi","spy":"teq","code":"39488","city":[{"name":"安卡拉","pinyin":"ankala","spy":"akl","code":"42771"},{"name":"安塔利亚","pinyin":"antaliya","spy":"atly","code":"6955099"},{"name":"迪亚巴克尔","pinyin":"diyabakeer","spy":"dybke","code":"6930733"},{"name":"凡城","pinyin":"fancheng","spy":"fc","code":"6110502"},{"name":"特拉布宗","pinyin":"telabuzong","spy":"tlbz","code":"6810128"},{"name":"伊斯坦布尔","pinyin":"yisitanbuer","spy":"ystbe","code":"3231852"}]},{"name":"泰国","pinyin":"taiguo","spy":"tg","code":"27024","city":[{"name":"芭堤雅","pinyin":"badiya","spy":"bdy","code":"8648911"},{"name":"董里","pinyin":"dongli","spy":"dl","code":"3471035"},{"name":"合艾","pinyin":"heai","spy":"ha","code":"3481195"},{"name":"华欣","pinyin":"huaxin","spy":"hx","code":"4198211"},{"name":"曼谷","pinyin":"mangu","spy":"mg","code":"3231835"},{"name":"普吉","pinyin":"puji","spy":"pj","code":"3300922"},{"name":"清莱","pinyin":"qinglai","spy":"ql","code":"3596368"},{"name":"清迈","pinyin":"qingmai","spy":"qm","code":"3299739"},{"name":"素叻他尼","pinyin":"suletani","spy":"sltn","code":"218904542"}]},{"name":"汤加","pinyin":"tangjia","spy":"tj","code":"37630945"},{"name":"塔吉克斯坦","pinyin":"tajikesitan","spy":"tjkst","code":"37630921"},{"name":"土库曼斯坦","pinyin":"tukumansitan","spy":"tkmst","code":"4427509"},{"name":"天宁","pinyin":"tianning","spy":"tn","code":"7468124"},{"name":"突尼斯","pinyin":"tunisi","spy":"tns","code":"3302680"},{"name":"台湾","pinyin":"taiwan","spy":"tw","code":"27368","city":[{"name":"板桥","pinyin":"banqiao","spy":"bq","code":"8139370"},{"name":"斗六","pinyin":"douliu","spy":"dl","code":"218926171"},{"name":"凤山","pinyin":"fengshan","spy":"fs","code":"9966263"},{"name":"丰原","pinyin":"fengyuan","spy":"fy","code":"7645107"},{"name":"高雄","pinyin":"gaoxiong","spy":"gx","code":"3301091"},{"name":"花莲","pinyin":"hualian","spy":"hl","code":"7648926"},{"name":"基隆","pinyin":"jilong","spy":"jl","code":"17398410"},{"name":"嘉义","pinyin":"jiayi","spy":"jy","code":"4024435"},{"name":"马公","pinyin":"magong","spy":"mg","code":"218926172"},{"name":"苗栗","pinyin":"miaoli","spy":"ml","code":"15224426"},{"name":"屏东","pinyin":"pingdong","spy":"pd","code":"9325819"},{"name":"台北","pinyin":"taibei","spy":"tb","code":"42417"},{"name":"太保","pinyin":"taibao","spy":"tb","code":"34758454"},{"name":"台东","pinyin":"taidong","spy":"td","code":"43540770"},{"name":"台南","pinyin":"tainan","spy":"tn","code":"4024226"},{"name":"桃园","pinyin":"taoyuan","spy":"ty","code":"56547"},{"name":"台中","pinyin":"taizhong","spy":"tz","code":"3301211"},{"name":"新营","pinyin":"xinying","spy":"xy","code":"218932025"},{"name":"新竹","pinyin":"xinzhu","spy":"xz","code":"4129351"},{"name":"宜兰","pinyin":"yilan","spy":"yl","code":"7553380"},{"name":"竹北","pinyin":"zhubei","spy":"zb","code":"218912826"},{"name":"彰化","pinyin":"zhanghua","spy":"zh","code":"68546823"}]},{"name":"乌干达","pinyin":"wuganda","spy":"wgd","code":"36730392"},{"name":"乌克兰","pinyin":"wukelan","spy":"wkl","code":"3316549"},{"name":"文莱","pinyin":"wenlai","spy":"wl","code":"3319599"},{"name":"乌拉圭","pinyin":"wulagui","spy":"wlg","code":"53003"},{"name":"委内瑞拉","pinyin":"weineiruila","spy":"wnrl","code":"52997"},{"name":"乌兹别克斯坦","pinyin":"wuzibiekesitan","spy":"wzbkst","code":"7260977"},{"name":"西班牙","pinyin":"xibanya","spy":"xby","code":"27424"},{"name":"香港","pinyin":"xianggang","spy":"xg","code":"27369"},{"name":"新加坡","pinyin":"xinjiapo","spy":"xjp","code":"43446","city":[{"name":"牛车水","pinyin":"niucheshui","spy":"ncs","code":"10032501"},{"name":"圣淘沙","pinyin":"shengtaosha","spy":"sts","code":"8099687"},{"name":"印度城","pinyin":"yinducheng","spy":"ydc","code":"218918069"},{"name":"樟宜","pinyin":"zhangyi","spy":"zy","code":"69763871"}]},{"name":"希腊","pinyin":"xila","spy":"xl","code":"3298620"},{"name":"叙利亚","pinyin":"xuliya","spy":"xly","code":"6469571"},{"name":"新西兰","pinyin":"xinxilan","spy":"xxl","code":"43444"},{"name":"匈牙利","pinyin":"xiongyali","spy":"xyl","code":"6897023"},{"name":"印度","pinyin":"yindu","spy":"yd","code":"27026","city":[{"name":"艾哈迈达巴德","pinyin":"aihamaidabade","spy":"ahmdbd","code":"3408075"},{"name":"班加罗尔","pinyin":"banjialuoer","spy":"bjle","code":"3320017"},{"name":"海德拉巴","pinyin":"haidelaba","spy":"hdlb","code":"3395243"},{"name":"加尔各答","pinyin":"jiaergeda","spy":"jegd","code":"3573421"},{"name":"马德拉斯","pinyin":"madelasi","spy":"mdls","code":"3299528"},{"name":"孟买","pinyin":"mengmai","spy":"mm","code":"3301082"},{"name":"新德里","pinyin":"xindeli","spy":"xdl","code":"3231858"}]},{"name":"约旦","pinyin":"yuedan","spy":"yd","code":"4272673"},{"name":"意大利","pinyin":"yidali","spy":"ydl","code":"39865108","city":[{"name":"比萨","pinyin":"bisa","spy":"bs","code":"22077"},{"name":"都灵","pinyin":"douling","spy":"dl","code":"3301014"},{"name":"佛罗伦萨","pinyin":"foluolunsa","spy":"flls","code":"3301001"},{"name":"罗马","pinyin":"luoma","spy":"lm","code":"58210"},{"name":"米兰","pinyin":"milan","spy":"ml","code":"64305683"},{"name":"那不勒斯","pinyin":"neibulesi","spy":"nbls","code":"3301028"},{"name":"庞贝","pinyin":"pangbei","spy":"pb","code":"7797185"},{"name":"维罗纳","pinyin":"weiluona","spy":"wln","code":"194668160"},{"name":"威尼斯","pinyin":"weinisi","spy":"wns","code":"3301023"},{"name":"锡耶纳","pinyin":"xiyena","spy":"xyn","code":"42970451"}]},{"name":"印度尼西亚","pinyin":"yindunixiya","spy":"ydnxy","code":"3355806","city":[{"name":"巴厘岛","pinyin":"balidao","spy":"bld","code":"3299566"},{"name":"棉兰","pinyin":"mianlan","spy":"ml","code":"3778090"},{"name":"日惹","pinyin":"rire","spy":"rr","code":"3778066"},{"name":"泗水","pinyin":"sishui","spy":"ss","code":"3330869"},{"name":"万隆","pinyin":"wanlong","spy":"wl","code":"3914246"},{"name":"雅加达","pinyin":"yajiada","spy":"yjd","code":"3231842"}]},{"name":"英国","pinyin":"yingguo","spy":"yg","code":"27411","city":[{"name":"爱丁堡","pinyin":"aidingbao","spy":"adb","code":"3301037"},{"name":"贝尔法斯特","pinyin":"beierfasite","spy":"befst","code":"4484558"},{"name":"伯明翰","pinyin":"bominghan","spy":"bmh","code":"3301043"},{"name":"加的夫","pinyin":"jiadefu","spy":"jdf","code":"3872188"},{"name":"剑桥","pinyin":"jianqiao","spy":"jq","code":"3276953"},{"name":"伦敦","pinyin":"lundun","spy":"ld","code":"58209"},{"name":"利物浦","pinyin":"liwupu","spy":"lwp","code":"39166"},{"name":"牛津","pinyin":"niujin","spy":"nj","code":"132564"},{"name":"普利茅斯","pinyin":"pulimaosi","spy":"plms","code":"5729006"},{"name":"谢菲尔德","pinyin":"xiefeierde","spy":"xfed","code":"6810784"}]},{"name":"伊朗","pinyin":"yilang","spy":"yl","code":"7978434"},{"name":"也门","pinyin":"yemen","spy":"ym","code":"3342873"},{"name":"牙买加","pinyin":"yamaijia","spy":"ymj","code":"52993"},{"name":"亚美尼亚","pinyin":"yameiniya","spy":"ymny","code":"7576774"},{"name":"越南","pinyin":"yuenan","spy":"yn","code":"27027","city":[{"name":"会安","pinyin":"huian","spy":"ha","code":"70377554"},{"name":"海防","pinyin":"haifang","spy":"hf","code":"38088577"},{"name":"河内","pinyin":"henei","spy":"hn","code":"3299896"},{"name":"金兰湾市","pinyin":"jinlanwanshi","spy":"jlws","code":"218910520"},{"name":"南定","pinyin":"nanding","spy":"nd","code":"218910521"},{"name":"芹苴","pinyin":"qinju","spy":"qj","code":"218910522"},{"name":"顺化","pinyin":"shunhua","spy":"sh","code":"6787172"},{"name":"岘港","pinyin":"xiangang","spy":"xg","code":"6787307"},{"name":"西贡(胡志明市）","pinyin":"xigong(huzhimingshi）","spy":"xg(hzms）","code":"218908560"},{"name":"芽庄","pinyin":"yazhuang","spy":"yz","code":"110395481"}]},{"name":"以色列","pinyin":"yiselie","spy":"ysl","code":"43550"},{"name":"亚洲其他国家","pinyin":"yazhouqitaguojia","spy":"yzqtgj","code":"82284434"},{"name":"赞比亚","pinyin":"zanbiya","spy":"zby","code":"11768346"},{"name":"智利","pinyin":"zhili","spy":"zl","code":"53001"}];

	return data;
});/**
* 城市选择器，支持国内和国际城市，也可以自定义城市数据
*
* @module city-selector
* @author freyaoo@gmail.com
* @version 1.1
*/
KISSY.add('gallery/city-selector/1.1/index',function(S,Node,Event,Overlay,Juicer,Richbase){
	'use strict';

    var CURCLS = 'ks-city-selector-cur',
        ALLCLS = 'ks-city-selector-all',
        WIDTH = 'width',
        HEIGHT = 'height',
        CHECKED = 'checked',
        PROVINCE = 'province',
        CITY = 'city',
        DISABLEDCLS = 'ks-city-selector-disabled',
        LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        TMPL = Juicer('<div class="${prefix}city-selector {@if provinceselect}ks-city-selector-province-select{@/if}" id="${prefix}city-selector${id}" style="width:${width}px;height:${height}px;">'+'<div class="ks-city-selector-content">'+
            '<div class="ks-city-selector-nav" id="ks-city-selector${id}-nav">'+
                '<span class="ks-city-selector-all ks-city-selector-cur ks-city-selector-letter-filter" id="ks-city-selector${id}-letter-all" data-value="all">全部</span>'+
                '{@each letters as item}<span id="ks-city-selector${id}-letter-${item.name}" data-value="${item.name}" class="ks-city-selector-letter-filter{@if item.disabled} ks-city-selector-disabled{@/if}">${item.name}</span>{@/each}'+
            '</div>' +
            '<div class="ks-city-selector-citylist" id="ks-city-selector${id}-citylist" style="height:${listheight}px;"><ul>' +
                '{@each data as item}<li class="ks-city-selector-province-${item.firstLetter}{@if !item.city} ks-city-selector-nocity{@/if}">'+
                    '<div class="ks-city-selector-province">'+
                        '<label for="ks-city-selector${id}-province-${item.id}">'+
                            '<span class="ks-city-selector-letter">${item.firstLetter}</span>'+
                            '<span class="ks-city-selector-province-name">{@if provinceselect}<input type="checkbox" class="ks-city-selector-select-province" id="ks-city-selector${id}-province-${item.id}" data-id="${item.id}" name="ks-city-selector-province" value="${item.name}">{@/if}${item.name}</span>'+
                        '</label>'+                     
                    '</div>'+
                    '{@if item.city}<div class="ks-city-selector-city">'+
                    '{@each item.city as subcity}<span>'+
                        '<input type="checkbox" id="ks-city-selector${id}-city-${subcity.id}" value="${subcity.name}" data-id="${subcity.id}" name="ks-city-selector-city" class="ks-city-selector-select-city">'+
                        '<label for="ks-city-selector${id}-city-${subcity.id}">${subcity.name}</label>'+
                    '</span>{@/each}'+
                    '</div>{@/if}'+
                '</li>{@/each}' +
            '</ul></div>'+
        '</div></div>');
    /**
    * 城市选择器constructor

        <input id="#foo" type="text">    
        KISSY.use('gallery/city-selector/1.1/domestic,gallery/city-selector/1.1/index',function(S,DomesticData,CitySelector){
        var city-selector = new CitySelector({
            data : DomesticData,
            node : '#foo'
        });

    *
    * @class CitySelector
    * @extends RichBase
    * @constructor   
    */

	var CitySelector = Richbase.extend({
    	initializer : function(){
            this._node = S.one(this.get('node'));
            this._renderNode = S.one(this.get('render'));
            if(!this._node && !this._renderNode){
                S.log('city-selector::node and render are not find,city-selector init failured!');
                return;
            }
            if(!this.get('data')){
            	S.log('city-selector::city-selector\'s data is undefined,city-selector init failured!');
            	return;
            }
            this._id = S.guid();
            this._selected = []; 
            this._selectedValues = [];   		
            this.render();
            this._node && this._checkCity();
            this._bind();
    	},
        destructor : function(){
            this._navEl.undelegate('click');
            this._listEl.undelegate('click');
            this._selected = undefined;
            this._selectedValues = undefined;
            this._formatData = undefined;
            this._provinces = undefined;
            this._citys = undefined;
            this._contentEl.remove();
        },
        /**
        * 绑定需要的事件
        *
        * @method _bind
        * @private
        */
        _bind : function(){
            var _ = this;
            this._navEl.delegate('click','.ks-city-selector-letter-filter',this._letterFilter,this);
            this._listEl.delegate('click','.ks-city-selector-province',this._toggleOrExpand,this);
            this._listEl.delegate('click','.ks-city-selector-select-city',this._selectCity,this);
            this._listEl.delegate('click','.ks-city-selector-select-province',this._selectProvince,this);
            if(this._overlay){
                Event.on('body','click',function(){
                    _._overlay.hide();
                });
                this._contentEl.on('click',function(e){
                    e.stopPropagation();
                });
                this._node.on('click',function(e){
                    e.stopPropagation();
                });
            }
        },
        /**
        * 预处理城市数据，主要是为了后面的dom操作方便
        *
        * @method _prepareData
        * @private
        */
        _prepareData : function(){
            var _ = this,
                letters = {};
            _._formatData = {};
            _._provinces = {};
            _._citys = {};
            S.each(_.get('data'),function(item){
                var firstLetter = item.pinyin.charAt(0).toUpperCase(),
                    city = [];
                item.firstLetter = firstLetter;
                item.id = S.guid();
                letters[firstLetter] = 1;
                S.each(item.city,function(val){
                    city.push(val.name);
                    val.id = S.guid();
                    _._citys[val.name] = val.id;
                    _._formatData[val.id] = S.merge(val,{
                        type : CITY,
                        province : item.name
                    });
                });
                _._provinces[item.name] = item.id;
                _._formatData[item.id] = S.merge(item,{
                    type : PROVINCE,
                    city : city
                })
            });
            return letters;
        },
        /**
        * 渲染城市选择器
        *
        * @method render
        * @return {CitySelector} this,当前实例
        * @chainable
        */
        render : function(){
            var _ = this,
                cityData = this.get('data'),
                ret = {},
                letters = _._prepareData(),
                w = this.get('autoWidth') ? this._node && this._node.width() : this.get(WIDTH),
                len = LETTERS.length,
                tmp = [];
            
            for(var i = 0;i < len;i++){
                var letter = LETTERS.charAt(i);
                tmp.push({
                    name : letter,
                    disabled : !letters[letter]
                });
            }

            var obj = {
                prefix : this.get('prefixCls'),
                provinceselect : this.get('canProvinceSelect'),
                letters : tmp,
                data : cityData,
                id : this._id,
                width : w,
                height : this.get(HEIGHT),
                listheight : this.get(HEIGHT) - 50
            };

            this._contentEl = S.one(TMPL.render(obj));
            this._navEl = this._contentEl.one('#ks-city-selector'+this._id+'-nav');
            this._listEl = this._contentEl.one('#ks-city-selector'+this._id+'-citylist');
            if(this._renderNode){
                this._renderNode.append(this._contentEl);
            }else{
                this._overlay = new Overlay.Popup({
                    prefixCls : 'ks-city-selector-',
                    width : w,
                    trigger : this._node,
                    visible : false,
                    align : {
                        node : this._node,
                        points : ['bl','tl'],
                        offset :[-1,0]
                    },
                    content : this._contentEl
                });
              
                this._overlay.on('show',function(){
                    _._checkCity();
                });
            }
            return this;
        },
        /**
        * 选择字母筛选触发的处理方法
        *
        * @method _letterFilter
        * @param {Event} e 
        * @private
        */
        _letterFilter : function(e){
            var tar = S.one(e.target),
                filter = tar.attr('data-value');
            if(tar.hasClass(CURCLS)){
                return;
            }
            this._setLetter(filter);
        },
        /**
        * 根据指定的字母处理dom
        *
        * @method _setLetter
        * @param {String} letter 指定的字母,26个字母加单词'all'
        * @private
        */
        _setLetter : function(letter){
            var curLetter = this._navEl.one('span.'+CURCLS),
                tar = S.one('#ks-city-selector'+this._id+'-letter-'+letter),
                list = this._listEl,
                provinces = list.all('li');
            if(tar.hasClass(DISABLEDCLS)){
                return;
            }
            curLetter.removeClass(CURCLS);
            tar.addClass(CURCLS);
            /**
            当用户切换首字母是触发
            @event letterchange
            @param {event} e 提供用户当前选择的首字母
            <dl>
            <dt>letter</dt><dd>用户选中的字母，如'x','a','all'</dd>
            </dl>
            */
            this.fire('letterchange',{
                letter : letter
            });
            if(tar.hasClass(ALLCLS)){
                provinces.show();
                return;
            }                   
            
            provinces.hide();
            this._listEl.all('li.ks-city-selector-province-'+letter).show();
        },
        /**
        * 收起或展开省下面的城市
        *
        * @method _toggleOrExpand
        * @param {event} e 
        * @private
        */
        _toggleOrExpand : function(e){
            var tar = S.one(e.target),
                li = tar.parent('li');
            li.toggleClass('ks-city-selector-expand');
        },
        /**
        * 根据输入框里已存在的城市选中城市选择器中的城市
        *
        * @method _checkCity
        * @private
        */
        _checkCity : function(){
            var _ = this,
                val = this._node.val().split(',');
            S.each(val,function(item){
                item && _.select(item);
            });
        },
        /**
        * 选中城市时的事件执行
        *
        * @method _selectCity
        * @param {event} e 
        * @private
        */
        _selectCity : function(e){
            var tar = S.one(e.target);
            if(tar.prop(CHECKED)){
                this.select(tar.val());                              
            }else{
                this.unSelect(tar.val());                
            }
        },
        /**
        * 选中省(国际对应国家)时的事件执行
        *
        * @method _selectProvince
        * @param {event} e 
        * @private
        */
        _selectProvince : function(e){
            var tar = S.one(e.target);
            if(tar.prop(CHECKED)){
                this.select(tar.val());
            }else{
                this.unSelect(tar.val());
            }           
        },
        /**
        * 根据传入的节点和类型填充input
        *
        * @method _fillInput
        * @param {Node} 触发事件的input[type=checkbox]节点 
        * @param {String} 类型{city|province}
        * @private
        */
        _fillInput : function(tar,type){
        	if(!this._node){
        		return;
        	}
            var val = S.trim(this._node.val()),
                newVal = tar.val();
            if(val.indexOf(newVal) <= -1){
                if(this.get('mutiple')){
                    if(val && !/,$/.test(val)){
                        this._node.val(val + ',' + newVal);
                    }else{
                        this._node.val(val + newVal + ',');
                    }
                }else{
                    this._node.val(newVal);
                }                
            }
        },
        /**
        * 根据传入的节点取消城市选择
        *
        * @method _delCity
        * @param {Node} tar input节点 
        * @private
        */
        _delCity : function(tar){
            var oldVal = S.trim(this._node.val());
            this._node.val(oldVal.replace(new RegExp(tar.val()+',?','g'),''));
        },
        /**
        * 设置'autoWidth'属性时执行
        *
        * @method _onSetAutoWidth
        * @private
        */
        _onSetAutoWidth : function(){
            if(this.get('autoWidth') && this._node){
                this._contentEl.css(WIDTH,this._node.width());
            }else{
                this._onSetWidth();
            }            
        },
        /**
        * 设置'width'属性时执行
        *
        * @method _onSetWidth
        * @private
        */
        _onSetWidth : function(){
            this._contentEl.css(WIDTH,this.get(WIDTH));
        },
        /**
        * 设置'height'属性时执行
        *
        * @method _onSetAutoHeight
        * @private
        */
        _onSetHeight : function(){
            var h = this.get(HEIGHT);
            this._contentEl.css(HEIGHT,h);
            this._listEl.css(HEIGHT,h - 50);
        },
        /**
        * 根据指定的字母切换到相应字母filter
        *
        * @method setLetter
        * @param {String} letter 指定的字母,'abcdefghijklmnopqrstuvwxyz'加单词'all'
        * @return {CitySelector} this，当前实例
        * @example 

        city-selector.setLetter('x'); //选中所有以'X'为拼音首字母的省
        city-selector.setLetter('all'); //选中全部

        * @chainable
        */
        setLetter : function(letter){
            if(letter == 'all'){
                this._setLetter(letter);
                return this;
            }
            if(S.isString(letter) && letter.length == 1 && LETTERS.indexOf(letter) > -1){
                this._setLetter(letter);
            }
            return this;
        },
        /**
        * 显示城市选择器
        *
        * @method show
        * @return {CitySelector} this，当前实例
        * @chainable
        */
        show : function(){
            this._contentEl.show();
            return this;
        },
        /**
        * 隐藏城市选择器
        *
        * @method hide
        * @return {CitySelector} this，当前实例
        * @chainable
        */
        hide : function(){
            this._contentEl.hide();
            return this;
        },
        /**
        * 选中指定城市
        *
        * @method select
        * @param {Array|String} string 城市名称，如'北京'或['北京','太原']
        * @return {CitySelector} this，当前实例
        * @example

        var city-selector = new CitySelector(config);
        city-selector.select('北京'); //会选中北京
        city-selector.select(['北京','杭州']); //会选中北京和杭州

        * @chainable
        */
        select : function(string){
            var _ = this;
            if(S.isArray(string)){
                S.each(string,function(item){
                    _.select(item);
                });
            }else{
                var node,
                    type,
                    id,
                    city = S.one('#ks-city-selector'+this._id+'-city-'+this._citys[string]),
                    province = S.one('#ks-city-selector'+this._id+'-province-'+this._provinces[string]);
                if(city){
                    node = city;
                    type = CITY;
                    id = this._citys[string];
                }else if(province){
                    node = province;
                    type = PROVINCE;
                    id = this._provinces[string];
                }
                if(node){
                    node.prop(CHECKED,true);
                    /**
                    当用户选择时触发
                    @event select
                    @param {event} e 提供用户选择的一些信息
                    <dl>
                    <dt>type</dt><dd>用户选中的类型，'city'或'province'</dd>
                    <dt>value</dt><dd>用户选中的值，'北京'</dd>
                    <dt>raw</dt><dd>用户选中的值对应的元数据</dd>
                    </dl>
                    */
                    this.fire('select',{
                        data : {
                            type : type,
                            value : string,
                            raw : this._formatData[id]
                        }                    
                    });
                    if(this.get('mutiple')){
                        this._selected.push(node);
                        this._selectedValues.push(string);
                    }else{
                        this._selected[0] && this._selected[0].prop(CHECKED,false);
                        this._selected[0] = node;
                        node.prop(CHECKED,true);
                        this._selectedValues[0] = string;
                    }
                    this._fillInput(node,type);
                }
            }
            return this;
        },
        /**
        * 取消选中指定城市，与select相反
        *
        * @method unSelect
        * @param {Array|String} string 城市名称，如'北京'或['北京','太原']
        * @return {CitySelector} this，当前实例
        * @chainable
        */
        unSelect : function(string){
            var _ = this;
            if(S.isArray(string)){
                S.each(string,function(item){
                    _.unSelect(item);
                });
            }else{
                var node,
                    type,
                    id,
                    city = S.one('#ks-city-selector'+this._id+'-city-'+this._citys[string]),
                    province = S.one('#ks-city-selector'+this._id+'-province-'+this._provinces[string]);
                if(city){
                    node = city;
                    type = CITY;
                    id = this._citys[string];
                }else if(province){
                    node = province;
                    type = PROVINCE;
                    id = this._provinces[string];
                }
                if(node){
                    node.prop(CHECKED,false);
                    /**
                    当用户取消选择时触发
                    @event unselect
                    @param {event} e 提供用户取消的一些信息
                    <dl>
                    <dt>type</dt><dd>用户取消的类型，'city'或'province'</dd>
                    <dt>value</dt><dd>用户取消的值，'北京'</dd>
                    <dt>raw</dt><dd>用户取消的值对应的元数据</dd>
                    </dl>
                    */
                    this.fire('unselect',{
                        data : {
                            type : type,
                            value : string,
                            raw : this._formatData[id]
                        }                    
                    });
                    if(this.get('mutiple')){
                        var tmpNode = [],
                            tmpString = [],
                            selectedVal = _._selectedValues;
                        S.each(_._selected,function(item,index){
                            if(!item.equals(node)){
                                tmpNode.push(item);
                            }
                            if(selectedVal[index] != string){
                                tmpString.push(selectedVal[index]);
                            }
                        });
                        this._selected = tmpNode;
                        this._selectedValues = tmpString;
                    }else{
                        this._selected = [];
                        this._selectedValues = []; 
                    }
                    this._node && this._delCity(node,type);
                }
            }
            return this;
        },
        /**
        * 获取用户当前已经选中的城市列表
        *
        * @method getSelected
        * @return {Array} 选中的城市列表，['北京','太原']
        */
        getSelected : function(){
            return this._selectedValues;
        }
    },{
    	ATTRS : {
            /**
            设置城市选择器的触发方式，在不设置render的情况下有效，会以overlay的方式呈现

            @attribute triggerType
            @type string
            @default 'focus'
            @writeOnce
            @optional
            */
    		triggerType : {
    			value : 'focus'
    		}, 
            /**
            设置城市选择器的宽度

            @attribute width
            @type number
            @default 500
            @optional
            */   		
            width : {
                value : 500
            }, 
            /**
            设置城市选择器的高度

            @attribute height
            @type number
            @default 400
            @optional
            */           
    		height : {
    			value : 400
    		},
            /**
            城市选择器默认宽度与input一致

            @attribute autoWidth
            @type boolean
            @default false
            @optional
            */
            autoWidth : {
                value : false
            },
            /**
            是否支持多选

            @attribute mutiple
            @type boolean
            @default false
            @optional
            */
    		mutiple : {
    			value : false
    		},
            /**
            省是否可以选择

            @attribute canProvinceSelect
            @type boolean
            @default false
            @optional
            */
            canProvinceSelect : {
                value : false
            },
            /**
            设置城市选择器的class前缀，只设置了一个，如果需要自定义样式，可使用此命名空间重置

            @attribute prefixCls
            @type string
            @default 'ks-'
            @optional
            @writeOnce
            */
            prefixCls : {
                value : 'ks-'
            }
            /**
            城市选择器所需要绑定的input节点

            @attribute node
            @type HTMLElement|node|selector
            @writeOnce
            */
            /**
            城市选择器渲染的父容器，如果不提供则使用overlay方式

            @attribute render
            @type HTMLElement|node|selector
            @writeOnce
            @optional
            */
            /**
            城市选择器需要的数据

            @attribute data
            @type json
            @writeOnce
            */
    	}
    },'CitySelector');

    return CitySelector;

},{requires:['node','event','overlay','gallery/juicer/1.2/index','rich-base','./assets/index.css']});
