localizedStrings = {
    'play-pause': {
        'en-us': 'Play / Pause',
        'zh-cn': '播放 / 暂停'
    },
    'stop': {
        'en-us': 'Stop',
        'zh-cn': '停止',
    },
    'reload': {
        'en-us': 'Reload everything',
        'zh-cn': '重新加载全部内容',
    },
    'audioOff': {
        'en-us': 'Audio (Current = off)',
        'zh-cn': '声音 （已关闭）',
    },
    'audioOn': {
        'en-us': 'Audio (Current = on)',
        'zh-cn': '声音 （已开启）',
    },
    'HBH': {
        'en-us': 'High Brunhilda',
        'zh-cn': '真布伦希尔德',
    },
    'HMC': {
        'en-us': 'High Mercury',
        'zh-cn': '真墨丘利',
    },
    'HJP': {
        'en-us': 'High Jupiter',
        'zh-cn': '真朱庇特',
    },
    'timeline-preview': {
        'en-us': 'Timeline preview',
        'zh-cn': '时间轴预览',
    },
    'event': {
        'en-us': 'event',
        'zh-cn': '事件',
    },
    'remain': {
        'en-us': 'remain',
        'zh-cn': '剩余',
    },
    'ref-to': {
        'en-us': 'ref',
        'zh-cn': '基准',
    },
    'next': {
        'en-us': 'next',
        'zh-cn': '接下来',
    },
    'follows': {
        'en-us': 'Follows by',
        'zh-cn': '随后',
    },
    'standard': {
        'en-us': 'Initial timeline',
        'zh-cn': '初始状态'
    },
    'controlPanel': {
        'en-us': 'Control panel',
        'zh-cn': '控制面板'
    },
    'importNew': {
        'en-us': 'Import from text (creates a new entry)',
        'zh-cn': '从文本导入（这将创建一个新的下拉菜单选项）'
    },
    'close': {
        'en-us': 'Close',
        'zh-cn': '关闭'
    },
    'save-load': {
        'en-us': 'Import / Export',
        'zh-cn': '导入 / 导出'
    },
    'removeSpc': {
        'en-us': 'Remove spaces (re-export)',
        'zh-cn': '去除空格（重新导出）'
    }
}

function loc(id)
{
    if(localizedStrings.hasOwnProperty(id))
    {
        return localizedStrings[id][document.locale];
    }
    return 'BAD_STRING';
}