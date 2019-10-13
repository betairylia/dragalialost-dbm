var enableSound = false;

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

        if (this.dom.querySelector(".ld"))
        {
            this.useLD = true;
            this.dom.querySelector(".ld").id = name + "_ldbar";
        }
        else
        {
            this.useLD = false;
            this.dom.querySelector(".timerBar").id = name + "_tbar";
        }

        destElem.appendChild(this.dom);
        // this.dom = destElem.lastElementChild;
        this.dom.id = name;
        this.dom.timer = this;

        if (this.useLD)
        {
            this.ldBar = new ldBar(this.dom.querySelector("#" + name + "_ldbar"), ldBarOpt);
            this.ldbarDom = this.dom.querySelector("#" + name + "_ldbar");
        }
        else
        {
            this.tbarDom = this.dom.querySelector("#" + name + "_tbar");
            this.tbar = this.tbarDom.querySelector(".bar");
            this.tbg = this.tbarDom.querySelector(".bg");

            // Set color, etc.
            this.tbar.style.backgroundColor = options.color;
        }

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
            if (options.viewBox && this.useLD)
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
            if (options.countdownFX)
            {
                this.countdownFX = options.countdownFX;
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

        if(this.useLD)
        {
            this.ldBar.set(this.timeElapsed / this.timeMax * 100.0);
        }
        else
        {
            this.tbar.style.width = `${this.timeElapsed / this.timeMax * 100.0}%`;
        }

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
            if(enableSound && this.countdownFX)
            {
                renderer.countdowns[second].play();
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

        this.countdowns = [];
        for(var i = 0; i < 10; i++)
        {
            this.countdowns.push(new Audio(`audio/${document.locale}/${i+1}.mp3`));
        }

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
                "displayName": timeline.name[document.locale],
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
                "displayName": timer.displayName[document.locale],
                "viewBox": "0 0 200 6",
                "animation": "right-slide-in",
                "initialTime": timer.time,
                "count": timer.count,
                "alert": timer.sfx,
                "countdown": timer.countdown,
                "color": timer.color,
                "countdownFX": ((typeof timer.countdownFX !== "undefined") ? timer.countdownFX : true),
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
                    "countdownFX": timer.countdownFX,
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
        this.drawn = {};
        this.drawTree(timeline, `${loc('standard')} (${loc('ref-to')} ${this.timeStr(timeline, timeline.timeTree[timeline.initialState].offset)})`, timeline.initialState, entry, itemTemplate, blockTemplate, 0);
    }

    timeStr(timeline, time)
    {
        return `${Math.floor((timeline.totalTime - time) / 60)}m ${((timeline.totalTime - time) % 60).toFixed(0)}s`
    }

    drawTree(timeline, comment, tree, entry, itemTemplate, blockTemplate, actCount)
    {        
        if(this.drawn.hasOwnProperty(tree) && this.drawn[tree])
        {
            return;
        }
        this.drawn[tree] = true;
        
        let curTree = timeline.timeTree[tree];
        let blockDOM = blockTemplate.content.cloneNode(true).children[0];

        blockDOM.id = tree;
        // blockDOM.querySelector(".title").innerText = curTree.displayName;

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
                        this.drawTree(timeline, `${loc('event')} "${action}", > ${this.timeStr(timeline, keyTime[0])} ${loc('remain')} (${loc('ref-to')} ${this.timeStr(timeline, timeline.timeTree[keyTime[1]].offset)})`, keyTime[1], blockEntry, itemTemplate, blockTemplate, actCount);
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
                optionDOM.innerText = `${timeline.actions[action].shortcut} - ${timeline.actions[action].displayName[document.locale]}`;
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

        // Draw actions in the end
        for(let action in curTree.actions)
        {
            for(let keyTime of curTree.actions[action])
            {
                if(keyTime[0] > prevTime)
                {
                    // Insert a block here
                    this.drawTree(timeline, `${loc('event')} "${action}", > ${this.timeStr(timeline, keyTime[0])} ${loc('remain')} (${loc('ref-to')} ${this.timeStr(timeline, timeline.timeTree[keyTime[1]].offset)})`, keyTime[1], blockEntry, itemTemplate, blockTemplate, actCount);
                }
            }
        }

        if(curTree.following[1])
        {
            // Insert a block afterwards
            this.drawTree(timeline, `${loc('follows')}, ${this.timeStr(timeline, curTree.following[0])} (${loc('ref-to')} ${this.timeStr(timeline, timeline.timeTree[curTree.following[1]].offset)})`, curTree.following[1], entry, itemTemplate, blockTemplate, actCount);
        }
    }
}

function setLocale(locale)
{
    document.locale = locale;
    setLocaleResNode(document);
}

function setLocaleResNode(DOM)
{
    if(DOM.classList)
    {
        DOM.classList.forEach((value, idx, arr) => {
            if(value.includes("autoLoc"))
            {
                strID = value.split('_');
                strID.splice(0, 1);
                strID = strID.join('_');
                DOM.innerText = loc(strID);
            }
        });
    }

    if(DOM.children)
    {
        for(let child of DOM.children)
        {
            setLocaleResNode(child);
        }
    }
}

function updateAudioButton()
{
    btn = document.getElementById('btnAudio');
    btn.classList.remove("BTNred");
    btn.classList.remove("BTNwhite");
    btn.classList.remove("autoLoc_audioOn");
    btn.classList.remove("autoLoc_audioOff");
    btn.classList.add(enableSound ? "autoLoc_audioOn" : "autoLoc_audioOff");
    btn.classList.add(enableSound ? "BTNred" : "BTNwhite");
    btn.innerText = loc(enableSound ? "audioOn" : "audioOff");
    console.log(btn.classList);
}

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
// Don't use this, it is shit (
function LightenDarkenColor(col, amt) 
{  
    let res = colourNameToHex(col)
    if(res)
    {
        col = res;
    }

    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

// https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
// LOL
function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}
