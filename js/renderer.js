var enableSound = false;
var countdowns = [];
for(var i = 0; i < 5; i++)
{
    countdowns.push(new Audio(`audio/zh${i+1}.mp3`));
}

class Timebar
{
    constructor(name, time, src, dest, ldBarOpt, options)
    {
        var template = document.getElementById(src);
        var destElem = document.getElementById(dest);
        this.dom = template.content.cloneNode(true).children[0];

        if(options && options.animation)
        {
            this.dom.classList.add(options.animation);
            this.animation = options.animation;
        }

        this.dom.querySelector(".ld").id = name + "_ldbar";

        destElem.appendChild(this.dom);
        // this.dom = destElem.lastElementChild;
        this.dom.id = name;
        this.dom.timer = this;

        this.ldBar = new ldBar(this.dom.querySelector("#" + name + "_ldbar"), ldBarOpt);
        this.ldbarDom = this.dom.querySelector("#" + name + "_ldbar");

        this.labelTime = this.dom.querySelector(".time_label");
        this.labelName = this.dom.querySelector(".name_label");

        this.timeMax = time;
        this.timeElapsed = 0;

        this.name = name;
        this.displayName = name;
        this.count = 1;
        destElem.removeChild(this.dom);

        this.state = 'alive';
        this.countdown = 0;
        this.currentCountDown = 20;
        this.alertPlayed = false;


        if (options)
        {
            if (options.initialTime)
            {
                this.timeElapsed = options.initialTime;
            }
            if (options.displayName)
            {
                this.displayName = options.displayName;
            }
            if (options.viewBox)
            {
                this.ldbarDom.getElementsByTagName("svg")[0].setAttribute("viewBox", options.viewBox);
            }
            if (options.count)
            {
                this.count = options.count;
            }
            if (options.alert)
            {
                this.alertAudio = options.alert;
            }
            if (options.color)
            {
                this.color = options.color;
            }
            if (options.countdown)
            {
                this.countdown = options.countdown;
            }
            // TODO
        }

        this.labelName.innerHTML = `${this.displayName}<span>#${this.count}</span>`;
        this.updateTimeLabel();
    }

    set(time)
    {
        this.timeElapsed = time;
        if(this.timeElapsed > this.timeMax)
        {
            this.timeElapsed = this.timeMax;
        }
        this.ldBar.set(this.timeElapsed / this.timeMax * 100.0);

        this.updateTimeLabel();
    }

    get value()
    {
        return this.timeElapsed;
    }

    get timeRemain()
    {
        return this.timeMax - this.timeElapsed;
    }

    updateTimeLabel()
    {
        var timeRemain = this.timeMax - this.timeElapsed;
        var minute = Math.floor(timeRemain / 60.0);
        var second = timeRemain - 60 * minute;
        var milsec = Math.floor((second - Math.floor(second)) * 100.0);
        second = Math.floor(second);

        milsec = ("00000" + milsec).substr(-2); // pad zeros

        if (minute > 0)
        {
            second = Math.floor(second);
            second = ("00000" + second).substr(-2); // pad zeros
            this.labelTime.innerHTML = `<h1>${minute}</h1>:<h2>${second}</h2>.<h3>${milsec}</h3>`;
        }
        else
        {
            this.labelTime.innerHTML = `<h2>${second}</h2>.<h3>${milsec}</h3>`;
        }

        // alert
        if(this.alertAudio && this.alertPlayed == false && timeRemain < (this.countdown + 1))
        {
            this.alertPlayed = true;
            
            if(enableSound == true)
            {
                this.alertAudio.play();
            }
        }

        if(timeRemain < this.countdown && (second + 1) != this.currentCountDown)
        {
            this.currentCountDown = second + 1;
            if(enableSound)
            {
                countdowns[second].play();
            }
        }

        if(timeRemain > (this.countdown + 2))
        {
            this.alertPlayed = false;
        }
    }

    in()
    {
        setTimeout(function(){this.dom.classList.remove(this.animation);}.bind(this), 20);
    }

    exit(animation, callback)
    {
        if(this.state == "alive")
        {
            this.state = "exit";
            this.dom.classList.add(animation);
            setTimeout(function(){this.dom.parentNode.removeChild(this.dom); callback(this);}.bind(this), 500);
        }
    }

    addClass(cls)
    {
        this.dom.classList.add(cls);12
    }

    removeClass(cls)
    {
        this.dom.classList.remove(cls);
    }
}

class Renderer
{
    constructor(idBig, idSub, idUpcoming, timeline)
    {
        this.idBig = idBig;
        this.idSub = idSub;
        this.idUpcoming = idUpcoming;

        this.upcomingThreshold = 10.0;
        this.timerLenth = 45.0;

        this.timeline = timeline;

        this.eBig = document.getElementById(this.idBig);
        this.eSub = document.getElementById(this.idSub);
        this.eUpc = document.getElementById(this.idUpcoming);

        this.totalTimers = 0;

        this.mainTimer = new Timebar(
            "mainTimer", timeline.totalTime, "bigTimer", this.idBig, 
            {
                "preset": "circle",
                "precision": "0.1",
                "stroke": "lightgrey",
                "stroke-width": "2",
                "stroke-trail": timeline.mainColor,
                "stroke-trail-width": "2",
            },
            {
                "displayName": timeline.name,
            }
        );

        this.eBig.appendChild(this.mainTimer.dom);

        this.queues = {
            'sub': {'container': this.eSub, 'timers': []}, 
            'upc': {'container': this.eUpc, 'timers': []}};

        this.shown = new Set();
    }

    addTimer(name, timer)
    {
        this.totalTimers += 1;

        if(!this.shown.has(name))
        {
            this.shown.add(name);
        }
        else
        {
            return;
        }

        var timer = new Timebar(
            name, this.timerLenth, "basicTimer", this.idSub,
            {
                "path": "M0 3L200 3",
                "stroke": timer.color,
                "stroke-width": "6",
                "stroke-trail-width": "2",
                "precision": "0.1",
            },
            {
                "displayName": timer.displayName,
                "viewBox": "0 0 200 6",
                "animation": "right-slide-in",
                "initialTime": timer.time,
                "count": timer.count,
                "alert": timer.sfx,
                "countdown": timer.countdown,
                "color": timer.color,
            }
        )
        
        if(timer.timeRemain < this.upcomingThreshold)
        {
            this.queues['upc'].timers.push(timer);
            this.addTimerToList(timer, this.eUpc);
        }
        else
        {
            this.queues['sub'].timers.push(timer);
            this.addTimerToList(timer, this.eSub);
        }
    }

    addTimerToList(timer, dest)
    {
        var flag = false;
        for(var timerDOM of dest.children)
        {
            if(timerDOM.timer.timeRemain > timer.timeRemain)
            {
                dest.insertBefore(timer.dom, timerDOM);
                flag = true;
                break;
            }
        }
        if(flag == false)
        {
            dest.appendChild(timer.dom);
        }
        timer.in();
    }

    sortQueues()
    {
        for(var queue in this.queues)
        {
            this.queues[queue].timers.sort(function(a, b)
            {
                return a.timeRemain - b.timeRemain;
            });
        }
    }

    render()
    {
        var current_timers = this.timeline.fetch(this.timerLenth);
        this.addNewTimers(current_timers);

        this.mainTimer.set(this.timeline.currentTime);

        for(var queue in this.queues)
        {
            for(var timer of this.queues[queue].timers)
            {
                if(current_timers.hasOwnProperty(timer.name))
                {
                    timer.set(current_timers[timer.name].time);
                    if(queue == 'sub')
                    {
                        if(timer.timeRemain <= this.upcomingThreshold && timer.state == 'alive')
                        {
                            this.transist(timer, 'sub', 'upc', 'up-disappear', 'bottom-slide-in');
                        }
                    }
                    else if (queue == 'upc')
                    {
                        if(timer.timeRemain >= this.upcomingThreshold && timer.state == 'alive')
                        {
                            this.transist(timer, 'upc', 'sub', 'fade-disappear', 'right-slide-in');
                        }
                    }
                }
                else if(timer.state == 'alive')
                {
                    this.transist(timer, queue, 'del', 'fade-disappear', 'none');
                }
            }
        }

        this.sortQueues();

        // Update by sort results
        for(var queue in this.queues)
        {
            var cidx = 0;
            var sidx = 0
            for(var i = 0; i < this.queues[queue].timers.length; i++)
            {
                while(this.queues[queue].container.children[cidx].timer.state != 'alive')
                {
                    cidx += 1;
                }

                if(this.queues[queue].container.children[cidx].timer != this.queues[queue].timers[sidx])
                {
                    console.log("!");
                    this.transist(this.queues[queue].container.children[cidx].timer, queue, queue, 'fade-disappear', 'fade-in')
                }
                else
                {
                    sidx += 1;
                }

                cidx += 1;
                // if(cidx >= this.queues[queue].container.children.length)
                // {
                //     break;
                // }
            }
        }

        // set upcoming flag
        var firstSet = false;
        for(var i = 0; i < this.queues['upc'].timers.length; i++)
        {
            if(firstSet == false && this.queues['upc'].timers[i].state == "alive")
            {
                firstSet = true;
                this.queues['upc'].timers[i].addClass('first');
            }
            else if(this.queues['upc'].timers[i].state == "alive")
            {
                this.queues['upc'].timers[i].removeClass('first');
            }
        }
    }

    addNewTimers(timers)
    {
        if(!timers)
        {
            return;
        }

        for(var timer of Object.keys(timers))
        {
            if(!this.shown.has(timer))
            {
                this.addTimer(timer, timers[timer]);
            }
        }
    }

    transist(timer, src, dest, eAnim, iAnim)
    {
        // console.log(`Transisting ${src} -> ${dest}, ${timer.name}`);
        if(dest != 'del')
        {
            var newTimer = new Timebar(
                timer.name, timer.timeMax, "basicTimer", this.queues[dest].container.id,
                {
                    "path": "M0 3L200 3",
                    "stroke": timer.color,
                    "stroke-width": "6",
                    "stroke-trail-width": "2",
                    "precision": "0.1",
                },
                {
                    "displayName": timer.displayName,
                    "viewBox": "0 0 200 6",
                    "animation": iAnim,
                    "initialTime": timer.time,
                    "count": timer.count,
                    "alert": timer.alertAudio,
                    "countdown": timer.countdown,
                    "color": timer.color,
                }
            );
            this.queues[dest].timers.push(newTimer);
            this.addTimerToList(newTimer, this.queues[dest].container);
        }
        else
        {
            this.shown.delete(timer.name);
        }
        timer.exit(eAnim, 
            function(tim)
            {
                // for(var i = 0; i < this.queues[src].timers.length; i++)
                // {
                //     if(this.queues[src].timers[i] === tim)
                //     {
                //         // console.log("deleted timer");
                //         this.queues[src].timers.splice(i, 1);
                //     }
                // }
            }.bind(this)
        );
        for(var i = 0; i < this.queues[src].timers.length; i++)
        {
            if(this.queues[src].timers[i] === timer)
            {
                // console.log("deleted timer");
                this.queues[src].timers.splice(i, 1);
            }
        }
        timer.state = "exit";
    }
}

class TLRenderer
{
    constructor(idTL, idTtlItem, idTtlBlock, timeline)
    {
        let entry           = document.getElementById(idTL);
        let itemTemplate    = document.getElementById(idTtlItem);
        let blockTemplate   = document.getElementById(idTtlBlock);

        this.allComboBoxes  = [];
        this.drawTree(timeline, 'Standard timeline', timeline.initialState, entry, itemTemplate, blockTemplate, 0);
    }

    drawTree(timeline, comment, tree, entry, itemTemplate, blockTemplate, actCount)
    {        
        let curTree = timeline.timeTree[tree];
        let blockDOM = blockTemplate.content.cloneNode(true).children[0];

        blockDOM.id = tree;
        blockDOM.querySelector(".title").innerText = curTree.displayName;

        entry.appendChild(blockDOM);
        let blockEntry = blockDOM.querySelector(".timeline-content-list");

        let cmt = document.createElement("ul");
        cmt.classList.add('list-title');
        cmt.innerText = comment;
        blockEntry.appendChild(cmt);

        let curTime = 0;

        let prevTime = 0;

        for(let item of curTree.timeline)
        {
            actCount += 1;

            let curTime = item[0];
            let curAct  = item[1];

            // Find actions before current time
            for(let action in curTree.actions)
            {
                for(let keyTime of curTree.actions[action])
                {
                    if(keyTime[0] <= curTime && keyTime[0] > prevTime)
                    {
                        // Insert a block here
                        this.drawTree(timeline, `Event "${action}", > ${Math.floor((timeline.totalTime - keyTime[0]) / 60)}m ${(timeline.totalTime - keyTime[0]) % 60}s remain (ref ${Math.floor((timeline.totalTime - timeline.timeTree[keyTime[1]].offset) / 60)}:${(timeline.totalTime - timeline.timeTree[keyTime[1]].offset) % 60})`, keyTime[1], blockEntry, itemTemplate, blockTemplate, actCount);
                    }
                }
            }

            prevTime = curTime;

            // Insert timeline item
            let itemDOM = itemTemplate.content.cloneNode(true).children[0];
            itemDOM.id = `${curAct}-${curTime}`;

            itemDOM.querySelector("#idx").innerText = `${actCount}.`;
            itemDOM.querySelector("#min").value = Math.floor((timeline.totalTime - curTime) / 60);
            itemDOM.querySelector("#sec").value = (timeline.totalTime - curTime) % 60;

            let idx = 0;
            let selectDOM = itemDOM.querySelector("#action");
            for(let action in timeline.actions)
            {
                let optionDOM = document.createElement("option");
                optionDOM.innerText = `${timeline.actions[action].shortcut} - ${timeline.actions[action].displayName}`;
                optionDOM.value = action;

                selectDOM.appendChild(optionDOM);
                
                if(action == curAct)
                {
                    selectDOM.selectedIndex = idx;
                }

                idx += 1;
            }

            blockEntry.appendChild(itemDOM);
        }

        if(curTree.following[1])
        {
            // Insert a block afterwards
            this.drawTree(timeline, 'Follows by', curTree.following[1], entry, itemTemplate, blockTemplate, actCount);
        }
    }
}
