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
        this.dom.classList.add(cls);
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
                        if(timer.timeRemain <= 0.0 && timer.state == 'alive')
                        {
                            this.transist(timer, 'upc', 'del', 'up-disappear', 'none');
                        }
                        else if(timer.timeRemain >= this.upcomingThreshold && timer.state == 'alive')
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
                    "stroke-width": "6",
                    "stroke-trail-width": "2",
                    "precision": "0.1",
                },
                {
                    "displayName": timer.displayName,
                    "viewBox": "0 0 200 6",
                    "animation": iAnim,
                    "initialTime": timer.timeElapsed,
                    "count": timer.count,
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
