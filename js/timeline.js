class Timeline
{
    constructor(initName)
    {
        this.mainColor = "lightcoral";
        this.totalTime = 300; //5min
        this.name = "Untitled Run";
        this.currentTime = 0.0;
        this.stateBegins = 0.0;

        this.timeTree = {};
        this.initialState = 'init';
        this.actions = {}; // {name, displayName, color, alertSFX, countdown}

        this.addTree(this.initialState);

        this.curState = this.initialState;
        this.curStep = 0;
        this.curActionCnt = {};

        if(this[`${initName}_test`])
        {
            this[`${initName}_test`].bind(this).apply();
        }
        this.reset();
    }

    HBH_test()
    {
        // this.name = "High Brunhilda"
        this.name = {
            'en-us': "High Brunhilda",
            'zh-cn': "真布伦希尔德",
        }

        this.actions = {
            'boom': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "真焰爆发",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '1',
            },
            'jump': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "后跳",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '2',
            },
            'fbre': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "烈焰吐息",
                },
                'color':        "orange",
                'alertSFX':     'fbre_test.mp3',
                'countdown':    3,
                'shortcut':     '3',
            },
            'char': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "前冲",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '4',
            },
            'claw': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "爪击",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '5',
            },
            'crim': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "绯红地狱",
                },
                'color':        "crimson",
                'alertSFX':     'crim_short_test.mp3',
                'countdown':    5,
                'shortcut':     '6',
            },
            'volc': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "陨落熔岩",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '7',
            },
            'hell': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "地狱之火",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '8',
            },
            'chas': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "烈焰追击",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '9',
            },
            'sear': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "红莲阵",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '0',
            },
            'mete': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "小陨石",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'q',
            },
            'gran': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "真 · 火焰国度",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'w',
            },
            'cros': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "真十字火焰",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'e',
            },
        };

        this.addActionInvMSec('init', 4, 55, 'boom');
        this.addActionInvMSec('init', 4, 53, 'jump');
        this.addActionInvMSec('init', 4, 47, 'fbre');
        this.addActionInvMSec('init', 4, 44, 'char');
        this.addActionInvMSec('init', 4, 41, 'claw');
        this.addActionInvMSec('init', 4, 35, 'crim');
        this.addActionInvMSec('init', 4, 25, 'volc');
        this.addActionInvMSec('init', 4, 21, 'volc');
        this.addActionInvMSec('init', 4, 20, 'crim');
        this.addActionInvMSec('init', 4, 19, 'fbre');
        this.addActionInvMSec('init', 4, 12, 'volc');
        this.addActionInvMSec('init', 4, 11, 'hell');
        this.addActionInvMSec('init', 4, 10, 'char');
        this.addActionInvMSec('init', 4,  6, 'volc');
        this.addActionInvMSec('init', 4,  5, 'hell');
        this.addActionInvMSec('init', 4,  3, 'char');
        this.addActionInvMSec('init', 3, 59, 'hell');
        this.addActionInvMSec('init', 3, 56, 'jump');
        this.addActionInvMSec('init', 3, 52, 'hell');
        this.addActionInvMSec('init', 3, 45, 'chas');
        this.addActionInvMSec('init', 3, 38, 'sear');
        this.addActionInvMSec('init', 3, 36, 'jump');
        this.addActionInvMSec('init', 3, 33, 'fbre');
        this.addActionInvMSec('init', 3, 27, 'mete');
        this.addActionInvMSec('init', 3, 21, 'crim');
        this.addActionInvMSec('init', 3, 12, 'gran');
        this.addActionInvMSec('init', 2, 52, 'chas');
        this.addActionInvMSec('init', 2, 46, 'char');
        this.addActionInvMSec('init', 2, 42, 'claw');
        this.addActionInvMSec('init', 2, 40, 'mete');
        this.addActionInvMSec('init', 2, 34, 'crim');
        this.addActionInvMSec('init', 2, 28, 'fbre');
        this.addActionInvMSec('init', 2,  7, 'jump');
        this.addActionInvMSec('init', 2,  3, 'fbre');
        this.addActionInvMSec('init', 1, 52, 'char');
        this.addActionInvMSec('init', 1, 46, 'volc');
        this.addActionInvMSec('init', 1, 49, 'claw');
        this.addActionInvMSec('init', 1, 39, 'volc');
        this.addActionInvMSec('init', 1, 41, 'hell');
        this.addActionInvMSec('init', 1, 37, 'jump');
        this.addActionInvMSec('init', 1, 34, 'volc');
        this.addActionInvMSec('init', 1, 36, 'hell');
        this.addActionInvMSec('init', 1, 29, 'char');
        this.addActionInvMSec('init', 1, 28, 'hell');
        this.addActionInvMSec('init', 1, 24, 'char');
        this.addActionInvMSec('init', 1, 22, 'hell');
        this.addActionInvMSec('init', 1, 13, 'chas');
        this.addActionInvMSec('init', 1,  6, 'sear');
        this.addActionInvMSec('init', 1,  5, 'jump');
        this.addActionInvMSec('init', 0, 59, 'fbre');
        this.addActionInvMSec('init', 0, 50, 'cros');
        this.addActionInvMSec('init', 0, 35, 'chas');
        this.addActionInvMSec('init', 0, 25, 'sear');

        // this.addEventInvMSec('init', 'bk0410', 'break 4:10', 'break', 4, 10);
    }

    HMC_test()
    {
        // this.name = "High Mercury"
        this.name = {
            'en-us': "High Mercury",
            'zh-cn': "真墨丘利",
        }
        this.mainColor = "deepskyblue";

        this.actions = {
            'boom': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "审判漩涡",
                },
                'color':        "dodgerblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '1',
            },
            'down': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "下砸",
                },
                'color':        "cadetblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '2',
            },
            'dash': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "前冲",
                },
                'color':        "cadetblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '3',
            },
            'tail': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "甩尾",
                },
                'color':        "blueviolet",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '4',
            },
            'spot': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "水弹",
                },
                'color':        "dodgerblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '5',
            },
            'wash': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "洗衣机",
                },
                'color':        "blue",
                'alertSFX':     null,
                'countdown':    4,
                'shortcut':     '6',
            },
            'bubb': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "救济之泡",
                },
                'color':        "springgreen",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '7',
            },
            'fall': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "瀑布",
                },
                'color':        "aqua",
                'alertSFX':     null,
                'countdown':    5,
                'shortcut':     '8',
            },
            'lock': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "水之牢笼",
                },
                'color':        "steelblue",
                'alertSFX':     null,
                'countdown':    3,
                'shortcut':     '9',
            },
            'chas': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "追踪水球",
                },
                'color':        "royalblue",
                'alertSFX':     null,
                'countdown':    2,
                'shortcut':     '0',
            },
            'spre': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "增殖水泡",
                },
                'color':        "powderblue",
                'alertSFX':     null,
                'countdown':    5,
                'shortcut':     'q',
            },
            'mobs': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "召唤伙伴",
                },
                'color':        "gold",
                'alertSFX':     null,
                'countdown':    3,
                'shortcut':     'w',
            },
            'brke': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "Break 结束",
                },
                'color':        "khaki",
                'alertSFX':     null,
                'countdown':    3,
                'shortcut':     'e',
            },
        };

        this.addActionInvMSec('init', 4, 56, 'boom');
        this.addActionInvMSec('init', 4, 52, 'down');
        this.addActionInvMSec('init', 4, 49, 'dash');
        this.addActionInvMSec('init', 4, 45, 'tail');
        this.addActionInvMSec('init', 4, 41, 'spot');
        this.addActionInvMSec('init', 4, 37, 'spot');
        this.addActionInvMSec('init', 4, 30, 'wash');
        this.addActionInvMSec('init', 4, 22, 'bubb');
        this.addActionInvMSec('init', 4, 20, 'down');
        this.addActionInvMSec('init', 4, 18, 'dash');
        this.addActionInvMSec('init', 4, 13, 'tail');
        this.addActionInvMSec('init', 4, 10, 'spot');
        this.addActionInvMSec('init', 4,  5, 'spot');
        this.addActionInvMSec('init', 4,  1, 'fall');
        this.addActionInvMSec('init', 3, 53, 'lock');
        this.addActionInvMSec('init', 3, 49, 'chas');
        this.addActionInvMSec('init', 3, 44, 'down');
        this.addActionInvMSec('init', 3, 41, 'dash');
        this.addActionInvMSec('init', 3, 36, 'tail');
        this.addActionInvMSec('init', 3, 32, 'spot');
        this.addActionInvMSec('init', 3, 28, 'spot');
        this.addActionInvMSec('init', 3, 22, 'wash');
        this.addActionInvMSec('init', 3, 11, 'spre');
        this.addActionInvMSec('init', 3,  4, 'spot');
        this.addActionInvMSec('init', 3,  1, 'spot');
        this.addActionInvMSec('init', 2, 57, 'spot');
        this.addActionInvMSec('init', 2, 49, 'wash');
        this.addActionInvMSec('init', 2, 40, 'bubb');
        this.addActionInvMSec('init', 2, 38, 'mobs');
        this.addActionInvMSec('init', 2, 35, 'down');
        this.addActionInvMSec('init', 2, 33, 'dash');
        this.addActionInvMSec('init', 2, 28, 'tail');
        this.addActionInvMSec('init', 2, 25, 'spot');
        this.addActionInvMSec('init', 2, 22, 'spot');
        this.addActionInvMSec('init', 2, 17, 'fall');
        this.addActionInvMSec('init', 2,  8, 'spre');

        this.addEventInvMSec('init', 'p2', 'After 1st BREAK', 'break', 2, 8, 3, 10);
        this.addActionInvMSec('p2', 3,  0, 'brke');
        this.addActionInvMSec('p2', 2, 52, 'spre');
        this.addActionInvMSec('p2', 2, 48, 'chas');
        this.addActionInvMSec('p2', 2, 43, 'spot');
        this.addActionInvMSec('p2', 2, 41, 'spot');
        this.addActionInvMSec('p2', 2, 35, 'down');
        this.addActionInvMSec('p2', 2, 33, 'dash');
        this.addActionInvMSec('p2', 2, 28, 'tail');
        this.addActionInvMSec('p2', 2, 24, 'spot');
        this.addActionInvMSec('p2', 2, 21, 'spot');
        this.addActionInvMSec('p2', 2, 16, 'wash');
        this.addActionInvMSec('p2', 2,  6, 'bubb');
        this.addActionInvMSec('p2', 2,  4, 'mobs');
        this.addActionInvMSec('p2', 2,  2, 'lock');
        this.addActionInvMSec('p2', 1, 54, 'down');
        this.addActionInvMSec('p2', 1, 52, 'dash');
        this.addActionInvMSec('p2', 1, 47, 'tail');
        this.addActionInvMSec('p2', 1, 42, 'fall');
        this.addActionInvMSec('p2', 1, 35, 'spre');
        this.addActionInvMSec('p2', 1, 29, 'wash');
        this.addActionInvMSec('p2', 1, 21, 'lock');
        this.addActionInvMSec('p2', 1, 11, 'spre');
        this.addActionInvMSec('p2', 1,  6, 'chas');
        

        // this.addActionInvMSec('init', , , '');
        // this.addActionInvMSec('init', , , '');
        // this.addActionInvMSec('init', , , '');
        // this.addActionInvMSec('init', , , '');

        // this.addActionInvMSec('init', , , '');
    }

    HJP_test()
    {
        // this.name = "High Mercury"
        this.name = {
            'en-us': "High Jupiter",
            'zh-cn': "真朱庇特",
        }
        this.mainColor = "gold";

        this.actions = {
            'boom': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "绝对雷暴",
                },
                'color':        "gold",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '0',
            },
            'peck': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "啄击",
                },
                'color':        "burlywood",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '1',
            },
            'dash': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "前冲",
                },
                'color':        "burlywood",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '2',
            },
            'surr': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "周身雷",
                },
                'color':        "yellow",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '3',
            },
            'surrx': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "周身雷（十字）",
                },
                'color':        "yellow",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '4',
            },
            'radi': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "辐射雷击",
                },
                'color':        "yellow",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '5',
            },
            'scan': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "雷霆之雨",
                },
                'color':        "yellow",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '6',
            },
            'scan2': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "雷霆之雨（往复）",
                },
                'color':        "coral",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '7',
            },
            'adde': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "电光一击",
                },
                'color':        "mediumvioletred",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '8',
            },
            'ibom': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "闪电暴怒（核爆）",
                },
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    5,
                'shortcut':     '9',
            },
            'chas': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "唤雷怒击",
                },
                'color':        "darkviolet",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '0',
            },
            'chrg': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "电光充能",
                },
                'color':        "salmon",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'q',
            },
            'dsco': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "球状闪电",
                },
                'color':        "aquamarine",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'w',
            },
            'dbom': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "球状闪电（爆炸）",
                },
                'color':        "aquamarine",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'w',
            },
            'brke': {
                'displayName':  {
                    'en-us': "",
                    'zh-cn': "Break 结束",
                },
                'color':        "yellowgreen",
                'alertSFX':     null,
                'countdown':    3,
                'shortcut':     'e',
            },
        };

        this.addActionInvMSec('init', 4, 56, 'boom');
        this.addActionInvMSec('init', 4, 52, 'peck');
        this.addActionInvMSec('init', 4, 48, 'dash');
        this.addActionInvMSec('init', 4, 45, 'surr');
        this.addActionInvMSec('init', 4, 38, 'radi');
        this.addActionInvMSec('init', 4, 22, 'scan');
        this.addActionInvMSec('init', 4, 20.5, 'radi');
        this.addActionInvMSec('init', 4, 15, 'peck');
        this.addActionInvMSec('init', 4, 10, 'dash');
        this.addActionInvMSec('init', 4,  7, 'surr');
        this.addActionInvMSec('init', 4,  0, 'adde');
        this.addActionInvMSec('init', 3, 48, 'scan');
        this.addActionInvMSec('init', 3, 46.5, 'radi');
        this.addActionInvMSec('init', 3, 41, 'ibom');
        this.followsInvMSec('init', 's1', 'Segment 1', 3, 32, 3, 32);

        this.addEventInvMSec('init', 'rbk1', 'BREAK #1', 'break', 3, 32.1, 3, 47);
        this.addActionInvMSec('rbk1', 3, 37, 'brke');
        this.followsInvMSec('rbk1', 's1', 'Segment 1', 3, 32, 3, 32);
        
        this.addActionInvMSec('s1', 3, 32, 'chas'); // <- BK node 5s
        this.addActionInvMSec('s1', 3, 30.5, 'chas');
        this.addActionInvMSec('s1', 3, 29, 'chas');
        this.addActionInvMSec('s1', 3, 24, 'chrg');
        this.followsInvMSec('s1', 's2', 'Segment 2', 3, 20, 3, 20);

        this.addEventInvMSec('s1', 'rbk2', 'BREAK #2', 'break', 3, 20, 3, 32);
        this.addActionInvMSec('rbk2', 3, 22, 'brke');
        this.followsInvMSec('rbk2', 's2', 'Segment 2', 3, 20, 3, 20);
        
        this.addActionInvMSec('s2', 3, 20, 'peck'); // <- BK node ? 2s ?
        this.followsInvMSec('s2', 's3', 'Segment 3', 3, 16, 3, 16);

        this.addEventInvMSec('s2', 'rbk3', 'BREAK #3', 'break', 3, 16, 3, 30);
        this.addActionInvMSec('rbk3', 3, 20, 'brke');
        this.followsInvMSec('rbk3', 's3', 'Segment 3', 3, 16, 3, 16);

        this.addActionInvMSec('s3', 3, 16, 'dash'); // <- BK node 4s
        this.followsInvMSec('s3', 's4', 'Segment 4', 3, 11, 3, 11);

        this.addEventInvMSec('s3', 'rbk4', 'BREAK #4', 'break', 3, 11, 3, 26);
        this.addActionInvMSec('rbk4', 3, 16, 'brke');
        this.followsInvMSec('rbk4', 's4', 'Segment 4', 3, 11, 3, 11);

        this.addActionInvMSec('s4', 3, 11, 'surr'); // <- BK node 5s
        this.addActionInvMSec('s4', 3,  9, 'surrx');
        this.addActionInvMSec('s4', 3,  5, 'radi');
        this.followsInvMSec('s4', 's5', 'Segment 5', 2, 58, 2, 58);

        this.addEventInvMSec('s4', 'rbk5', 'BREAK #5', 'break', 2, 58, 3, 13);
        this.addActionInvMSec('rbk5', 3, 3, 'brke');
        this.followsInvMSec('rbk5', 's5', 'Segment 5', 2, 58, 2, 58);
        
        this.addActionInvMSec('s5', 2, 58, 'chas'); // <- BK node 5s
        this.addActionInvMSec('s5', 2, 56.5, 'chas');
        this.addActionInvMSec('s5', 2, 55, 'chas');
        this.addActionInvMSec('s5', 2, 46, 'scan');
        this.addActionInvMSec('s5', 2, 45, 'scan2');
        this.addActionInvMSec('s5', 2, 42, 'adde');
        this.addActionInvMSec('s5', 2, 35, 'dsco');
        this.addActionInvMSec('s5', 2, 30, 'dbom');
        this.addActionInvMSec('s5', 2, 29, 'chas');
        this.addActionInvMSec('s5', 2, 27.5, 'chas');
        this.addActionInvMSec('s5', 2, 26, 'chas');
        this.addActionInvMSec('s5', 2, 25, 'dbom');
        this.addActionInvMSec('s5', 2, 23, 'ibom');
        this.addActionInvMSec('s5', 2, 20, 'dbom');
        this.addActionInvMSec('s5', 2, 16, 'peck');
        this.addActionInvMSec('s5', 2, 15, 'dbom');
        this.addActionInvMSec('s5', 2, 13, 'dash');
        this.addActionInvMSec('s5', 2,  8, 'surr');
        this.addActionInvMSec('s5', 2,  1, 'chas');
        this.addActionInvMSec('s5', 1, 59.5, 'chas');
        this.addActionInvMSec('s5', 1, 58, 'chas');
        this.addActionInvMSec('s5', 1, 49, 'scan');
        this.addActionInvMSec('s5', 1, 47.5, 'radi');
        this.addActionInvMSec('s5', 1, 40, 'chrg');
        this.addActionInvMSec('s5', 1, 35, 'peck');
        this.addActionInvMSec('s5', 1, 32, 'dash');
        this.addActionInvMSec('s5', 1, 27, 'surr');
        this.addActionInvMSec('s5', 1, 25, 'surrx');
        this.addActionInvMSec('s5', 1, 21, 'chas');
        this.addActionInvMSec('s5', 1, 19.5, 'chas');
        this.addActionInvMSec('s5', 1, 18, 'chas');
        this.addActionInvMSec('s5', 1, 13, 'radi');
        this.addActionInvMSec('s5', 1,  7, 'dsco');
        this.addActionInvMSec('s5', 1,  2, 'dbom');
        this.addActionInvMSec('s5', 1,  0, 'adde');
        this.addActionInvMSec('s5', 0, 57, 'dbom');
        this.addActionInvMSec('s5', 0, 52, 'dbom');
        this.addActionInvMSec('s5', 0, 49, 'scan');
        this.addActionInvMSec('s5', 0, 48, 'scan2');
        this.addActionInvMSec('s5', 0, 46, 'dbom');
        this.addActionInvMSec('s5', 0, 45, 'chas');
        this.addActionInvMSec('s5', 0, 43.5, 'chas');
        this.addActionInvMSec('s5', 0, 42, 'chas');
        this.addActionInvMSec('s5', 0, 39, 'ibom');
        this.addActionInvMSec('s5', 0, 32, 'peck');
        this.addActionInvMSec('s5', 0, 28, 'dash');
        this.addActionInvMSec('s5', 0, 24, 'surr');
        this.addActionInvMSec('s5', 0, 14, 'scan');
        this.addActionInvMSec('s5', 0, 11, 'chas');
        this.addActionInvMSec('s5', 0, 9.5, 'chas');
        this.addActionInvMSec('s5', 0, 8, 'chas');
        this.addActionInvMSec('s5', 0, 4, 'radi');

        // this.addEventInvMSec('init', 'p2', 'After 1st BREAK', 'break', 2, 8, 3, 10);
        // this.addActionInvMSec('init', , , '');
    }

    adjust(dt)
    {
        this.currentTime += dt;
    }

    reset()
    {
        this.currentTime = 0;
        this.curState = this.initialState;
        this.curStep = 0;
        this.curActionCnt = {};
        this.stateBegins = 0;

        for(var action of Object.keys(this.actions))
        {
            this.curActionCnt[action] = 0;
            if(this.actions[action].alertSFX != null)
            {
                this.actions[action].alertAudioNode = new Audio('audio/' + this.actions[action].alertSFX);
            }
            console.log(this.actions[action]);
        }
    }

    addTree(name, displayName, offset)
    {
        if(this.timeTree.hasOwnProperty(name))
        {
            return;
        }

        this.timeTree[name] = {
            'timeline': [], // [[time, action_str], ...]
            'local': true,
            'offset': offset || 0,
            'displayName': displayName || "Default",
            'actions': {
                'break': [], // [[latest_time, dest_state], ...]
            },
            'following': [this.totalTime, undefined], // time_max, dest_state
        };
    }

    addEventInvMSec(src, dest, dest_dName, event, mins, secs, refm, refs)
    {
        let time = mins * 60 + secs;
        time = this.totalTime - time;

        let reftime = refm * 60 + refs
        reftime = this.totalTime - reftime;

        this.addTree(dest, dest_dName, reftime);
        this.timeTree[src].actions[event].push([time, dest]);
    }

    followsInvMSec(src, dest, dest_dName, mins, secs, refm, refs)
    {
        let time = mins * 60 + secs;
        time = this.totalTime - time;

        let reftime = refm * 60 + refs
        reftime = this.totalTime - reftime;

        this.addTree(dest, dest_dName, reftime);
        this.timeTree[src].following = [time, dest];
    }

    addAction(tree, time, action)
    {
        this.timeTree[tree].timeline.push([time, action]);
        this.timeTree[tree].timeline.sort(function(a, b){return a[0] - b[0];});
    }

    addActionInvMSec(tree, min, sec, action)
    {
        var totalRemain = min * 60 + sec;
        this.addAction(tree, this.totalTime - totalRemain, action);
    }

    trigger(event, args)
    {
        let curTree = this.timeTree[this.curState];

        console.log(curTree.actions[event]);

        for(let keyTime of curTree.actions[event])
        {
            if(this.currentTime <= keyTime[0])
            {
                // Worldline change !!!
                this.curState = keyTime[1];
                this.stateBegins = this.currentTime;
                this.curStep = 0;
                console.log(`${event} @ ${this.currentTime.toFixed(2)}: Event triggered and changed to ${this.curState} timeline.`);
                return;
            }
        }
        console.log(`${event} @ ${this.currentTime.toFixed(2)}: Event triggered but nothing changed.`);
    }

    treeGlobalTime(treeKey, time, begins)
    {
        return (time - this.timeTree[treeKey].offset + begins);
    }

    fetch(length, tree, tmpstep, tmpactc, begins)
    {
        if(!tree)
        {
            tree = this.curState;
        }

        var results = {};
        if(tmpstep == undefined) {tmpstep = this.curStep;}
        tmpactc = tmpactc || JSON.parse(JSON.stringify(this.curActionCnt));
        var curline = this.timeTree[tree].timeline;

        if(begins == undefined) {begins = this.stateBegins;}

        while(tmpstep < curline.length)
        {
            if(this.treeGlobalTime(tree, curline[tmpstep][0], begins) - this.currentTime > length)
            {
                break;
            }
            var cact = curline[tmpstep][1];
            tmpactc[cact] += 1;
            results[`${cact}_${tmpactc[cact]}`] = {
                'displayName': this.actions[cact].displayName,
                'time': length - (this.treeGlobalTime(tree, curline[tmpstep][0], begins) - this.currentTime),
                'count': tmpactc[cact],
                'color': this.actions[cact].color,
                'sfx': this.actions[cact].alertAudioNode,
                'countdown': this.actions[cact].countdown
            }
            tmpstep += 1;
        }

        // Handle following timelines
        if(this.timeTree[tree].following[1])
        {
            Object.assign(results, this.fetch(length, this.timeTree[tree].following[1], 0, tmpactc, this.treeGlobalTime(tree, this.timeTree[tree].following[0], begins)));
        }

        return results;
    }

    update(dt)
    {
        this.currentTime += dt * 1;
        if(this.currentTime > this.totalTime)
        {
            this.currentTime = this.totalTime;
        }

        // Handle following timelines
        while(this.treeGlobalTime(this.curState, this.timeTree[this.curState].following[0], this.stateBegins) < this.currentTime && this.timeTree[this.curState].following[1])
        {
            this.curState = this.timeTree[this.curState].following[1];
            this.stateBegins = this.currentTime;
            this.curStep = 0;
            console.log(`${this.currentTime.toFixed(2)}: Timeline switched to following ${this.curState} timeline.`);
        }

        let offset = this.timeTree[this.curState].offset - this.stateBegins;
        var curline = this.timeTree[this.curState].timeline;
        if(this.curStep < curline.length && (this.currentTime > (curline[this.curStep][0] - offset)))
        {
            this.curActionCnt[curline[this.curStep][1]] += 1;
            this.curStep += 1;
        }
    }
}