"use strict";

var msgElement = document.getElementById('msg')
function msg(text) {
    msgElement.textContent = text
}

var lightBrightness = 0
var chosenPoint = [-10000,-10000]
var bridgeUsers = []

var modelsToGamut = {
    "LLC010": "A", 
    "LLC011": "A", 
    "LLC012": "A", 
    "LLC013": "A", 
    "LLC014": "A", 
    "LLC020": "C", 
    "LLC007": "A", 
    "LLC006": "A", 
    "LLC005": "A", 
    "LCT001": "B", 
    "LLC001": "A", 
    "LCT002": "B", 
    "LLM001": "B", 
    "LCT003": "B", 
    "LST001": "A", 
    "LCT007": "B", 
    "LST002": "C",
}

var knownColours = {
    'Black':{rgb:[0,0,0],A:[0.,0.], B:[0.,0.], C:[0.,0.]},
    'Alice Blue':{rgb:[239,247,255], A:[0.3088,0.3212], B:[0.3092,0.321], C:[0.3088,0.3212]},
    'Antique White':{rgb:[249,234,214], A:[0.3548,0.3489], B:[0.3548,0.3489], C:[0.3548,0.3489]},
    'Aqua':{rgb:[0,255,255], A:[0.17,0.3403], B:[0.2858,0.2747], C:[0.1607,0.3423]},
    'Aquamarine':{rgb:[127,255,211], A:[0.2138,0.4051], B:[0.3237,0.3497], C:[0.2138,0.4051]},
    'Azure':{rgb:[239,255,255], A:[0.3059,0.3303], B:[0.3123,0.3271], C:[0.3059,0.3303]},
    'Beige':{rgb:[244,244,219], A:[0.3402,0.356], B:[0.3402,0.356], C:[0.3402,0.356]},
    'Bisque':{rgb:[255,226,196], A:[0.3806,0.3576], B:[0.3806,0.3576], C:[0.3806,0.3576]},
    'Black':{rgb:[0,0,0], A:[0.139,0.081], B:[0.168,0.041], C:[0.153,0.048]},
    'Blanched Almond':{rgb:[255,234,204], A:[0.3695,0.3584], B:[0.3695,0.3584], C:[0.3695,0.3584]},
    'Blue':{rgb:[0,0,255], A:[0.139,0.081], B:[0.168,0.041], C:[0.153,0.048]},
    'Blue Violet':{rgb:[137,43,226], A:[0.245,0.1214], B:[0.251,0.1056], C:[0.251,0.1056]},
    'Brown':{rgb:[165,40,40], A:[0.6399,0.3041], B:[0.6399,0.3041], C:[0.6399,0.3041]},
    'Burlywood':{rgb:[221,183,135], A:[0.4236,0.3811], B:[0.4236,0.3811], C:[0.4236,0.3811]},
    'Cadet Blue':{rgb:[94,158,160], A:[0.2211,0.3328], B:[0.2961,0.295], C:[0.2211,0.3328]},
    'Chartreuse':{rgb:[127,255,0], A:[0.2682,0.6632], B:[0.408,0.517], C:[0.2505,0.6395]},
    'Chocolate':{rgb:[209,104,30], A:[0.6009,0.3684], B:[0.6009,0.3684], C:[0.6009,0.3684]},
    'Coral':{rgb:[255,127,79], A:[0.5763,0.3486], B:[0.5763,0.3486], C:[0.5763,0.3486]},
    'Cornflower':{rgb:[99,147,237], A:[0.1905,0.1945], B:[0.2343,0.1725], C:[0.1905,0.1945]},
    'Cornsilk':{rgb:[255,247,219], A:[0.3511,0.3574], B:[0.3511,0.3574], C:[0.3511,0.3574]},
    'Crimson':{rgb:[219,20,61], A:[0.6531,0.2834], B:[0.6417,0.304], C:[0.6508,0.2881]},
    'Cyan':{rgb:[0,255,255], A:[0.17,0.3403], B:[0.2858,0.2747], C:[0.1607,0.3423]},
    'Dark Blue':{rgb:[0,0,140], A:[0.139,0.081], B:[0.168,0.041], C:[0.153,0.048]},
    'Dark Cyan':{rgb:[0,140,140], A:[0.17,0.3403], B:[0.2858,0.2747], C:[0.1607,0.3423]},
    'Dark Goldenrod':{rgb:[183,135,10], A:[0.5265,0.4428], B:[0.5204,0.4346], C:[0.5214,0.4361]},
    'Dark Gray':{rgb:[168,168,168], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Dark Green':{rgb:[0,99,0], A:[0.214,0.709], B:[0.408,0.517], C:[0.17,0.7]},
    'Dark Khaki':{rgb:[188,183,107], A:[0.4004,0.4331], B:[0.4004,0.4331], C:[0.4004,0.4331]},
    'Dark Magenta':{rgb:[140,0,140], A:[0.3787,0.1724], B:[0.3824,0.1601], C:[0.3833,0.1591]},
    'Dark Olive Green':{rgb:[84,107,45], A:[0.3475,0.5047], B:[0.3908,0.4829], C:[0.3475,0.5047]},
    'Dark Orange':{rgb:[255,140,0], A:[0.5951,0.3872], B:[0.5916,0.3824], C:[0.5921,0.3831]},
    'Dark Orchid':{rgb:[153,51,204], A:[0.296,0.1409], B:[0.2986,0.1341], C:[0.2986,0.1341]},
    'Dark Red':{rgb:[140,0,0], A:[0.7,0.2986], B:[0.674,0.322], C:[0.692,0.308]},
    'Dark Salmon':{rgb:[232,150,122], A:[0.4837,0.3479], B:[0.4837,0.3479], C:[0.4837,0.3479]},
    'Dark Sea Green':{rgb:[142,188,142], A:[0.2924,0.4134], B:[0.3429,0.3879], C:[0.2924,0.4134]},
    'Dark Slate Blue':{rgb:[71,61,140], A:[0.2206,0.1484], B:[0.2218,0.1477], C:[0.2206,0.1484]},
    'Dark Slate Gray':{rgb:[45,79,79], A:[0.2239,0.3368], B:[0.2982,0.2993], C:[0.2239,0.3368]},
    'Dark Turquoise':{rgb:[0,206,209], A:[0.1693,0.3347], B:[0.2835,0.2701], C:[0.1605,0.3366]},
    'Dark Violet':{rgb:[147,0,211], A:[0.2742,0.1326], B:[0.2836,0.1079], C:[0.2824,0.1104]},
    'Deep Pink':{rgb:[255,20,147], A:[0.5454,0.2359], B:[0.5386,0.2468], C:[0.5445,0.2369]},
    'Deep Sky Blue':{rgb:[0,191,255], A:[0.1576,0.2368], B:[0.2428,0.1893], C:[0.158,0.2379]},
    'Dim Gray':{rgb:[104,104,104], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Dodger Blue':{rgb:[30,142,255], A:[0.1484,0.1599], B:[0.2115,0.1273], C:[0.1559,0.1599]},
    'Firebrick':{rgb:[178,33,33], A:[0.6621,0.3023], B:[0.6566,0.3123], C:[0.6621,0.3023]},
    'Floral White':{rgb:[255,249,239], A:[0.3361,0.3388], B:[0.3361,0.3388], C:[0.3361,0.3388]},
    'Forest Green':{rgb:[33,140,33], A:[0.2097,0.6732], B:[0.408,0.517], C:[0.1984,0.6746]},
    'Fuchsia':{rgb:[255,0,255], A:[0.3787,0.1724], B:[0.3824,0.1601], C:[0.3833,0.1591]},
    'Gainsboro':{rgb:[219,219,219], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Ghost White':{rgb:[247,247,255], A:[0.3174,0.3207], B:[0.3174,0.3207], C:[0.3174,0.3207]},
    'Gold':{rgb:[255,214,0], A:[0.4947,0.472], B:[0.4859,0.4599], C:[0.4871,0.4618]},
    'Goldenrod':{rgb:[216,165,33], A:[0.5136,0.4444], B:[0.5113,0.4413], C:[0.5125,0.4428]},
    'Gray':{rgb:[191,191,191], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Web Gray':{rgb:[127,127,127], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Green':{rgb:[0,255,0], A:[0.214,0.709], B:[0.408,0.517], C:[0.17,0.7]},
    'Web Green':{rgb:[0,127,0], A:[0.214,0.709], B:[0.408,0.517], C:[0.17,0.7]},
    'Green Yellow':{rgb:[173,255,45], A:[0.3298,0.5959], B:[0.408,0.517], C:[0.3221,0.5857]},
    'Honeydew':{rgb:[239,255,239], A:[0.316,0.3477], B:[0.3213,0.345], C:[0.316,0.3477]},
    'Hot Pink':{rgb:[255,104,181], A:[0.4682,0.2452], B:[0.4682,0.2452], C:[0.4682,0.2452]},
    'Indian Red':{rgb:[204,91,91], A:[0.5488,0.3112], B:[0.5488,0.3112], C:[0.5488,0.3112]},
    'Indigo':{rgb:[73,0,130], A:[0.2332,0.1169], B:[0.2437,0.0895], C:[0.2428,0.0913]},
    'Ivory':{rgb:[255,255,239], A:[0.3334,0.3455], B:[0.3334,0.3455], C:[0.3334,0.3455]},
    'Khaki':{rgb:[239,229,140], A:[0.4019,0.4261], B:[0.4019,0.4261], C:[0.4019,0.4261]},
    'Lavender':{rgb:[229,229,249], A:[0.3085,0.3071], B:[0.3085,0.3071], C:[0.3085,0.3071]},
    'Lavender Blush':{rgb:[255,239,244], A:[0.3369,0.3225], B:[0.3369,0.3225], C:[0.3369,0.3225]},
    'Lawn Green':{rgb:[124,252,0], A:[0.2663,0.6649], B:[0.408,0.517], C:[0.2485,0.641]},
    'Lemon Chiffon':{rgb:[255,249,204], A:[0.3608,0.3756], B:[0.3608,0.3756], C:[0.3608,0.3756]},
    'Light Blue':{rgb:[173,216,229], A:[0.2621,0.3157], B:[0.2975,0.2979], C:[0.2621,0.3157]},
    'Light Coral':{rgb:[239,127,127], A:[0.5075,0.3145], B:[0.5075,0.3145], C:[0.5075,0.3145]},
    'Light Cyan':{rgb:[224,255,255], A:[0.2901,0.3316], B:[0.3096,0.3218], C:[0.2901,0.3316]},
    'Light Goldenrod':{rgb:[249,249,209], A:[0.3504,0.3717], B:[0.3504,0.3717], C:[0.3504,0.3717]},
    'Light Gray':{rgb:[211,211,211], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Light Green':{rgb:[142,237,142], A:[0.2648,0.4901], B:[0.3682,0.438], C:[0.2648,0.4901]},
    'Light Pink':{rgb:[255,181,193], A:[0.4112,0.3091], B:[0.4112,0.3091], C:[0.4112,0.3091]},
    'Light Salmon':{rgb:[255,160,122], A:[0.5016,0.3531], B:[0.5016,0.3531], C:[0.5016,0.3531]},
    'Light Sea Green':{rgb:[33,178,170], A:[0.1721,0.358], B:[0.2946,0.292], C:[0.1611,0.3593]},
    'Light Sky Blue':{rgb:[135,206,249], A:[0.214,0.2749], B:[0.2714,0.246], C:[0.214,0.2749]},
    'Light Slate Gray':{rgb:[119,135,153], A:[0.2738,0.297], B:[0.2924,0.2877], C:[0.2738,0.297]},
    'Light Steel Blue':{rgb:[175,196,221], A:[0.276,0.2975], B:[0.293,0.2889], C:[0.276,0.2975]},
    'Light Yellow':{rgb:[255,255,224], A:[0.3436,0.3612], B:[0.3436,0.3612], C:[0.3436,0.3612]},
    'Lime':{rgb:[0,255,0], A:[0.214,0.709], B:[0.408,0.517], C:[0.17,0.7]},
    'Lime Green':{rgb:[51,204,51], A:[0.2101,0.6765], B:[0.408,0.517], C:[0.1972,0.6781]},
    'Linen':{rgb:[249,239,229], A:[0.3411,0.3387], B:[0.3411,0.3387], C:[0.3411,0.3387]},
    'Magenta':{rgb:[255,0,255], A:[0.3787,0.1724], B:[0.3824,0.1601], C:[0.3833,0.1591]},
    'Maroon':{rgb:[175,48,96], A:[0.5383,0.2566], B:[0.5383,0.2566], C:[0.5383,0.2566]},
    'Web Maroon':{rgb:[127,0,0], A:[0.7,0.2986], B:[0.674,0.322], C:[0.692,0.308]},
    'Medium Aquamarine':{rgb:[102,204,170], A:[0.215,0.4014], B:[0.3224,0.3473], C:[0.215,0.4014]},
    'Medium Blue':{rgb:[0,0,204], A:[0.139,0.081], B:[0.168,0.041], C:[0.153,0.048]},
    'Medium Orchid':{rgb:[186,84,211], A:[0.3365,0.1735], B:[0.3365,0.1735], C:[0.3365,0.1735]},
    'Medium Purple':{rgb:[147,112,219], A:[0.263,0.1773], B:[0.263,0.1773], C:[0.263,0.1773]},
    'Medium Sea Green':{rgb:[61,178,112], A:[0.1979,0.5005], B:[0.3588,0.4194], C:[0.1979,0.5005]},
    'Medium Slate Blue':{rgb:[122,104,237], A:[0.2179,0.1424], B:[0.2189,0.1419], C:[0.2179,0.1424]},
    'Medium Spring Green':{rgb:[0,249,153], A:[0.1919,0.524], B:[0.3622,0.4262], C:[0.1655,0.5275]},
    'Medium Turquoise':{rgb:[71,209,204], A:[0.176,0.3496], B:[0.2937,0.2903], C:[0.176,0.3496]},
    'Medium Violet Red':{rgb:[198,20,132], A:[0.504,0.2201], B:[0.5002,0.2255], C:[0.5047,0.2177]},
    'Midnight Blue':{rgb:[25,25,112], A:[0.1585,0.0884], B:[0.1825,0.0697], C:[0.1616,0.0802]},
    'Mint Cream':{rgb:[244,255,249], A:[0.315,0.3363], B:[0.3165,0.3355], C:[0.315,0.3363]},
    'Misty Rose':{rgb:[255,226,224], A:[0.3581,0.3284], B:[0.3581,0.3284], C:[0.3581,0.3284]},
    'Moccasin':{rgb:[255,226,181], A:[0.3927,0.3732], B:[0.3927,0.3732], C:[0.3927,0.3732]},
    'Navajo White':{rgb:[255,221,173], A:[0.4027,0.3757], B:[0.4027,0.3757], C:[0.4027,0.3757]},
    'Navy Blue':{rgb:[0,0,127], A:[0.139,0.081], B:[0.168,0.041], C:[0.153,0.048]},
    'Old Lace':{rgb:[252,244,229], A:[0.3421,0.344], B:[0.3421,0.344], C:[0.3421,0.344]},
    'Olive':{rgb:[127,127,0], A:[0.4432,0.5154], B:[0.4317,0.4996], C:[0.4334,0.5022]},
    'Olive Drab':{rgb:[107,142,35], A:[0.354,0.5561], B:[0.408,0.517], C:[0.354,0.5561]},
    'Orange':{rgb:[255,165,0], A:[0.5614,0.4156], B:[0.5562,0.4084], C:[0.5569,0.4095]},
    'Orange Red':{rgb:[255,68,0], A:[0.6726,0.3217], B:[0.6733,0.3224], C:[0.6731,0.3222]},
    'Orchid':{rgb:[216,112,214], A:[0.3688,0.2095], B:[0.3688,0.2095], C:[0.3688,0.2095]},
    'Pale Goldenrod':{rgb:[237,232,170], A:[0.3751,0.3983], B:[0.3751,0.3983], C:[0.3751,0.3983]},
    'Pale Green':{rgb:[153,249,153], A:[0.2675,0.4826], B:[0.3657,0.4331], C:[0.2675,0.4826]},
    'Pale Turquoise':{rgb:[175,237,237], A:[0.2539,0.3344], B:[0.3034,0.3095], C:[0.2539,0.3344]},
    'Pale Violet Red':{rgb:[219,112,147], A:[0.4658,0.2773], B:[0.4658,0.2773], C:[0.4658,0.2773]},
    'Papaya Whip':{rgb:[255,239,214], A:[0.3591,0.3536], B:[0.3591,0.3536], C:[0.3591,0.3536]},
    'Peach Puff':{rgb:[255,216,186], A:[0.3953,0.3564], B:[0.3953,0.3564], C:[0.3953,0.3564]},
    'Peru':{rgb:[204,132,63], A:[0.5305,0.3911], B:[0.5305,0.3911], C:[0.5305,0.3911]},
    'Pink':{rgb:[255,191,204], A:[0.3944,0.3093], B:[0.3944,0.3093], C:[0.3944,0.3093]},
    'Plum':{rgb:[221,160,221], A:[0.3495,0.2545], B:[0.3495,0.2545], C:[0.3495,0.2545]},
    'Powder Blue':{rgb:[175,224,229], A:[0.262,0.3269], B:[0.302,0.3068], C:[0.262,0.3269]},
    'Purple':{rgb:[160,33,239], A:[0.2651,0.1291], B:[0.2725,0.1096], C:[0.2725,0.1096]},
    'Web Purple':{rgb:[127,0,127], A:[0.3787,0.1724], B:[0.3824,0.1601], C:[0.3833,0.1591]},
    'Rebecca Purple':{rgb:[102,51,153], A:[0.2703,0.1398], B:[0.2703,0.1398], C:[0.2703,0.1398]},
    'Red':{rgb:[255,0,0], A:[0.7,0.2986], B:[0.674,0.322], C:[0.692,0.308]},
    'Rosy Brown':{rgb:[188,142,142], A:[0.4026,0.3227], B:[0.4026,0.3227], C:[0.4026,0.3227]},
    'Royal Blue':{rgb:[63,104,224], A:[0.1649,0.1338], B:[0.2047,0.1138], C:[0.1649,0.1338]},
    'Saddle Brown':{rgb:[140,68,17], A:[0.5993,0.369], B:[0.5993,0.369], C:[0.5993,0.369]},
    'Salmon':{rgb:[249,127,114], A:[0.5346,0.3247], B:[0.5346,0.3247], C:[0.5346,0.3247]},
    'Sandy Brown':{rgb:[244,163,96], A:[0.5104,0.3826], B:[0.5104,0.3826], C:[0.5104,0.3826]},
    'Sea Green':{rgb:[45,140,86], A:[0.1968,0.5047], B:[0.3602,0.4223], C:[0.1968,0.5047]},
    'Seashell':{rgb:[255,244,237], A:[0.3397,0.3353], B:[0.3397,0.3353], C:[0.3397,0.3353]},
    'Sienna':{rgb:[160,81,45], A:[0.5714,0.3559], B:[0.5714,0.3559], C:[0.5714,0.3559]},
    'Silver':{rgb:[191,191,191], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Sky Blue':{rgb:[135,206,234], A:[0.2206,0.2948], B:[0.2807,0.2645], C:[0.2206,0.2948]},
    'Slate Blue':{rgb:[107,89,204], A:[0.2218,0.1444], B:[0.2218,0.1444], C:[0.2218,0.1444]},
    'Slate Gray':{rgb:[112,127,142], A:[0.2762,0.3009], B:[0.2944,0.2918], C:[0.2762,0.3009]},
    'Snow':{rgb:[255,249,249], A:[0.3292,0.3285], B:[0.3292,0.3285], C:[0.3292,0.3285]},
    'Spring Green':{rgb:[0,255,127], A:[0.1994,0.5864], B:[0.3882,0.4777], C:[0.1671,0.5906]},
    'Steel Blue':{rgb:[68,130,181], A:[0.183,0.2325], B:[0.248,0.1997], C:[0.183,0.2325]},
    'Tan':{rgb:[209,181,140], A:[0.4035,0.3772], B:[0.4035,0.3772], C:[0.4035,0.3772]},
    'Teal':{rgb:[0,127,127], A:[0.17,0.3403], B:[0.2858,0.2747], C:[0.1607,0.3423]},
    'Thistle':{rgb:[216,191,216], A:[0.3342,0.2971], B:[0.3342,0.2971], C:[0.3342,0.2971]},
    'Tomato':{rgb:[255,99,71], A:[0.6112,0.3261], B:[0.6112,0.3261], C:[0.6112,0.3261]},
    'Turquoise':{rgb:[63,224,209], A:[0.1732,0.3672], B:[0.2997,0.3022], C:[0.1702,0.3675]},
    'Violet':{rgb:[237,130,237], A:[0.3644,0.2133], B:[0.3644,0.2133], C:[0.3644,0.2133]},
    'Wheat':{rgb:[244,221,178], A:[0.3852,0.3737], B:[0.3852,0.3737], C:[0.3852,0.3737]},
    'White':{rgb:[255,255,255], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'White Smoke':{rgb:[244,244,244], A:[0.3227,0.329], B:[0.3227,0.329], C:[0.3227,0.329]},
    'Yellow':{rgb:[255,255,0], A:[0.4432,0.5154], B:[0.4317,0.4996], C:[0.4334,0.5022]},
    'Yellow Green':{rgb:[153,204,51], A:[0.3517,0.5618], B:[0.408,0.517], C:[0.3517,0.5618]},
}

function refreshLightState() {
    var countTotal = 0
    var countOn = 0
    bridgeUsers.forEach(function (user) {
	for (var lightName in user.foundLights) {
	    var light = user.foundLights[lightName]
	    msg('Found light ' + light.name)
	    ++countTotal
	    if (light.state.on) ++countOn 
	}
    })
    lightBrightness = countOn / countTotal
    msg(countTotal + ' lights' + (lightBrightness == 1 ? ' on' : (lightBrightness == 0 ? ' off' : '')))
}

function refreshLights(user, errorFunction) {
    var lights = user.getLights(function(lights) {
	user.foundLights = lights

	if (bridgeUsers.indexOf(user) == -1) {
	    bridgeUsers.push(user)
	    localStorage.setItem('username_' + user.bridge.id, user.username)
	}
	localStorage.setItem('bridge_ip', user.bridge.ip)
	localStorage.setItem('bridge_id', user.bridge.id)	    

	refreshLightState()
    }, errorFunction)
}

function tryUsername(bridge, username) {
    var user = bridge.user(username)
    user.bridge = bridge
    user.username = username
    refreshLights(user, function (error) {
	tryCreateUsername(bridge)
    })
}

function tryCreateUsername(bridge) {
    bridge.createUser('huerainbo', function(data) {
	var answer = data[0]
		    
	if (answer.success) { 
	    var username = answer.success.username
	    tryUsername(bridge, username)
	} else {
	    msg(answer.error.description)
	    setTimeout(function() {
		tryCreateUsername(bridge)
	    }, 500)
	}
    })
}

function tryBridge(ip, id) {
    var bridge = jsHue().bridge(ip)
    bridge.id = id
    bridge.ip = ip
    var username = localStorage.getItem('username_' + id)
    if (username) {
	tryUsername(bridge, username)
    } else {
	tryCreateUsername(bridge)
    }
}

var knownBridgeIP = localStorage.getItem('bridge_ip')
var knownBridgeID = localStorage.getItem('bridge_id')

if (knownBridgeID && knownBridgeIP) {
    tryBridge(knownBridgeIP, knownBridgeID)
}

    
jsHue().discover(
    function(bridges) {
        if(!bridges.length) {
	    msg('No hue lights :(')
        } else {
            bridges.forEach(function(b) {
		msg('Found bridge ' + b.internalipaddress)
		tryBridge(b.internalipaddress, b.id)
	    })
	}
    })

var requestsInFlight = 0

function receivedSetLightResponse(user,light,data) {
    if (--requestsInFlight == 0) {
	bridgeUsers.forEach(refreshLights)
    }
}

function setAllLightsToComputedState(lightStateCalculator) {
    bridgeUsers.forEach(function (user) {
	var lights = user.foundLights
	for (var light in lights) {
	    var lightState = lightStateCalculator(lights[light])

	    if (user.setLightState(light, lightState, function(data) {
		receivedSetLightResponse(user,light,data)
	    }, function (error) {
		console.error('light',light,error)
		receivedSetLightResponse(user,light,error)
	    })) {
		++requestsInFlight
	    }
	}
    })
}


function setAllLights(lightState) {
    return setAllLightsToComputedState(function (x) { return lightState })
}

var twglCanvas =document.getElementById("twgl-canvas")
var gl = twgl.getWebGLContext(twglCanvas, {preserveDrawingBuffer: true}) // preserveDrawingBuffer needed for readPixels
var rainbowProgram = twgl.createProgramInfo(gl, ["rainbow-vertex-shader", "rainbow-fragment-shader"])
var twoTriangles = twgl.createBufferInfoFromArrays(gl, {
    position: [
	    -1, -1, 0,
	    1,-1, 0,
	    -1, 1, 0,

	    -1, 1, 0,
	    1, -1, 0,
	    1, 1, 0],
})
gl.useProgram(rainbowProgram.program)
twgl.setBuffersAndAttributes(gl, rainbowProgram, twoTriangles)

function render(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    twgl.setUniforms(rainbowProgram, {
        wobble: (time * 0.012) % (2*Math.PI),
        resolution: [gl.canvas.width, gl.canvas.height],
	background: [lightBrightness,lightBrightness,lightBrightness],
	chosenPoint: chosenPoint,
    })
    twgl.drawBufferInfo(gl, gl.TRIANGLES, twoTriangles)
    requestAnimationFrame(render)
}
requestAnimationFrame(render)

function pow2(x) { return x*x; }

function findColour(rgb) {
    var best = 'White'
    var bestScore = 255*255*3

    for (var colourName in knownColours) {
	var colour = knownColours[colourName]
	var score = 0
	for (var i = 0; 3 > i; ++i) {
	    score += pow2(rgb[i] - colour.rgb[i])
	}
	if (bestScore > score) {
	    best = colourName
	    bestScore = score
	}
    }
    return best
}

function findViewPosition(obj) {
    var x = 0, y = 0
    do {
        x += obj.offsetLeft
        y += obj.offsetTop
	obj = obj.offsetParent
    } while (obj)
    return { x: x, y: y }
}
twglCanvas.onclick =  function(e) {
    var pos = findViewPosition(this)
    var x = e.pageX - pos.x
    var y = e.pageY - pos.y
    
    var pixels = new Uint8Array(4)
    chosenPoint = [x, this.height - y]
    gl.readPixels(chosenPoint[0],chosenPoint[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

    var colour = findColour(pixels)
    var on = true

    if (colour == 'White' && lightBrightness == 1) {
	on = false
    } else if (colour == 'Black') {
	on = true
	colour = 'White'
    }

    if (on) {
	msg(colour)
    } else {
	msg('Lights off!')
    }

    msgElement.style.color = 'rgb(' + knownColours[colour].rgb.join(',') + ')'
    
    setAllLightsToComputedState(function (light) {
	return {
	    'on': on,
	    'xy':knownColours[colour][modelsToGamut[light['modelid']]],
	}
    })
}

