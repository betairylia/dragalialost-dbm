class Timeline
{
    mainColor = "lightcoral";
    totalTime = 300; //5min
    name = "Untitled Run";
    currentTime = 0.0;

    constructor()
    {
        this.timeTree = {};
        this.initialState = 'init';
        this.actions = {}; // {name, displayName, color, alertSFX, countdown}

        this.addTree(this.initialState);

        this.curState = this.initialState;
        this.curStep = 0;
        this.curActionCnt = {};

        this.HBH_test();
        this.reset();
    }

    HBH_test()
    {
        this.name = "High Brunhilda"

        this.actions = {
            'boom': {
                'displayName':  "真焰爆发",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'jump': {
                'displayName':  "后跳",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'fbre': {
                'displayName':  "烈焰吐息",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'char': {
                'displayName':  "前冲",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'claw': {
                'displayName':  "爪击",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'crim': {
                'displayName':  "绯红地狱",
                'color':        "crimson",
                'alertSFX':     null,
                'countdown':    0,
            },
            'volc': {
                'displayName':  "陨落熔岩",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'hell': {
                'displayName':  "地狱之火",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'chas': {
                'displayName':  "烈焰追击",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'sear': {
                'displayName':  "红莲阵",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'mete': {
                'displayName':  "小陨石",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'gran': {
                'displayName':  "真 · 火焰国度",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
            'cros': {
                'displayName':  "真十字火焰",
                'color':        "orange",
                'alertSFX':     null,
                'countdown':    0,
            },
        };

        this.addActionInvMSec('init', 4, 55, 'boom');
        this.addActionInvMSec('init', 4, 53, 'jump');
        this.addActionInvMSec('init', 4, 47, 'fbre');
        this.addActionInvMSec('init', 4, 44, 'char');
        this.addActionInvMSec('init', 4, 41, 'claw');
        this.addActionInvMSec('init', 4, 35, 'crim');
        this.addActionInvMSec('init', 4, 25, 'volc');
        this.addActionInvMSec('init', 4, 20, 'volc');
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
        }
    }

    addTree(name)
    {
        this.timeTree[name] = {
            'timeline': [], // [[time, action_str], ...]
            'actions': {
                'break': [], // [[latest_time, dest_state], ...]
            }
        };
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
        // TODO
    }

    fetch(length)
    {
        var results = {};
        var tmpstep = this.curStep;
        var tmpactc = JSON.parse(JSON.stringify(this.curActionCnt));
        var curline = this.timeTree[this.curState].timeline;
        while(tmpstep < curline.length)
        {
            if(curline[tmpstep][0] - this.currentTime > length)
            {
                break;
            }
            var cact = curline[tmpstep][1];
            tmpactc[cact] += 1;
            results[`${cact}_${tmpactc[cact]}`] = {
                'displayName': this.actions[cact].displayName,
                'time': length - (curline[tmpstep][0] - this.currentTime),
                'count': tmpactc[cact],
                'color': this.actions[cact].color,
                'sfx': this.actions[cact].alertSFX,
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

        var curline = this.timeTree[this.curState].timeline;
        if(this.curStep < curline.length && this.currentTime > curline[this.curStep][0])
        {
            this.curActionCnt[curline[this.curStep][1]] += 1;
            this.curStep += 1;
        }
    }
}