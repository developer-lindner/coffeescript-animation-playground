class Utils
    constructor: () ->

    captureMouse: (element) =>

        mouse =
            x: 0
            y: 0
            event: null

        body_scrollTop = document.body.scrollTop
        body_scrollLeft = document.body.scrollLeft
        element_scrollTop = document.documentElement.scrollTop
        element_scrollLeft = document.documentElement.scrollLeft
        offsetTop = element.offsetTop
        offsetLeft = element.offsetLeft
        
        element.addEventListener 'mousemove', (event) ->

            if event.pageX || event.pageY
                x = event.pageX
                y = event.pageY

            else
                x = event.clientX + body_scrollLeft + element_scrollLeft
                y = event.clientY + body_scrollTop + element_scrollTop

            mouse.x = x
            mouse.y = y
            mouse.event = event
        mouse

    parseColor: (color, toNumber) =>
        if toNumber is true
            if typeof color is 'number'
                color | 0
            if typeof color is 'string' and color[0] is '#'
                color = color.slice 1
            window.parseInt color, 16
        else
            if typeof color is 'number'
                color = '#' + ('00000' + (color | 0).toString(16)).substr(-6)
            color
