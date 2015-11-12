$ ->
    canvas = $("#canvas")[0]
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    context = canvas.getContext '2d'

    currentVis = 1

    visuals = [
            id: 0
            name: "Animation 1"
            fn: new Line(canvas, context)
        ,
            id: 1
            name: "Animation 2"
            fn: new Fountain(canvas, context)
    ]

    # Add window.resize event handler
    $(window).on "resize", () ->
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        visuals[currentVis].fn.canvasResized canvas


    #visuals[currentVis].fn.tearDown()
    visuals[currentVis].fn.setUpAndStart()