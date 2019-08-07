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
        this.name = "真布伦希尔德"

        this.actions = {
            'boom': {
                'displayName':  "真焰爆发",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '1',
            },
            'jump': {
                'displayName':  "后跳",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '2',
            },
            'fbre': {
                'displayName':  "烈焰吐息",
                'color':        "orange",
                'alertSFX':     'fbre_test.mp3',
                'countdown':    3,
                'shortcut':     '3',
            },
            'char': {
                'displayName':  "前冲",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '4',
            },
            'claw': {
                'displayName':  "爪击",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '5',
            },
            'crim': {
                'displayName':  "绯红地狱",
                'color':        "crimson",
                'alertSFX':     'crim_short_test.mp3',
                'countdown':    5,
                'shortcut':     '6',
            },
            'volc': {
                'displayName':  "陨落熔岩",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '7',
            },
            'hell': {
                'displayName':  "地狱之火",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '8',
            },
            'chas': {
                'displayName':  "烈焰追击",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '9',
            },
            'sear': {
                'displayName':  "红莲阵",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '0',
            },
            'mete': {
                'displayName':  "小陨石",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'q',
            },
            'gran': {
                'displayName':  "真 · 火焰国度",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     'w',
            },
            'cros': {
                'displayName':  "真十字火焰",
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
        this.name = "真墨丘利"
        this.mainColor = "deepskyblue";

        this.actions = {
            'boom': {
                'displayName':  "审判漩涡",
                'color':        "dodgerblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '1',
            },
            'down': {
                'displayName':  "下砸",
                'color':        "cadetblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '2',
            },
            'dash': {
                'displayName':  "前冲",
                'color':        "cadetblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '3',
            },
            'tail': {
                'displayName':  "甩尾",
                'color':        "blueviolet",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '4',
            },
            'spot': {
                'displayName':  "水弹",
                'color':        "dodgerblue",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '5',
            },
            'wash': {
                'displayName':  "洗衣机",
                'color':        "blue",
                'alertSFX':     null,
                'countdown':    4,
                'shortcut':     '6',
            },
            'bubb': {
                'displayName':  "救济之泡",
                'color':        "springgreen",
                'alertSFX':     null,
                'countdown':    0,
                'shortcut':     '7',
            },
            'fall': {
                'displayName':  "瀑布",
                'color':        "aqua",
                'alertSFX':     null,
                'countdown':    5,
                'shortcut':     '8',
            },
            'lock': {
                'displayName':  "水之牢笼",
                'color':        "steelblue",
                'alertSFX':     null,
                'countdown':    3,
                'shortcut':     '9',
            },
            'chas': {
                'displayName':  "追踪水球",
                'color':        "royalblue",
                'alertSFX':     null,
                'countdown':    2,
                'shortcut':     '0',
            },
            'spre': {
                'displayName':  "增殖水泡",
                'color':        "powderblue",
                'alertSFX':     null,
                'countdown':    5,
                'shortcut':     'q',
            },
            'mobs': {
                'displayName':  "召唤伙伴",
                'color':        "gold",
                'alertSFX':     null,
                'countdown':    3,
                'shortcut':     'w',
            },
            'brke': {
                'displayName':  "Break 结束",
                'color':        "khaki",
                'alertSFX':     null,
                'countdown':    3,
                'shortcut':     'w',
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

    fetch(length)
    {
        var results = {};
        var tmpstep = this.curStep;
        var tmpactc = JSON.parse(JSON.stringify(this.curActionCnt));
        var curline = this.timeTree[this.curState].timeline;

        let offset = this.timeTree[this.curState].offset - this.stateBegins;

        while(tmpstep < curline.length)
        {
            if((curline[tmpstep][0] - offset) - this.currentTime > length)
            {
                break;
            }
            var cact = curline[tmpstep][1];
            tmpactc[cact] += 1;
            results[`${cact}_${tmpactc[cact]}`] = {
                'displayName': this.actions[cact].displayName,
                'time': length - ((curline[tmpstep][0] - offset) - this.currentTime),
                'count': tmpactc[cact],
                'color': this.actions[cact].color,
                'sfx': this.actions[cact].alertAudioNode,
                'countdown': this.actions[cact].countdown
            }
            tmpstep += 1;
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

        let offset = this.timeTree[this.curState].offset - this.stateBegins;
        var curline = this.timeTree[this.curState].timeline;
        if(this.curStep < curline.length && (this.currentTime > (curline[this.curStep][0] - offset)))
        {
            this.curActionCnt[curline[this.curStep][1]] += 1;
            this.curStep += 1;
        }
    }
}