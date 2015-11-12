class Fountain
    constructor:(@canvas, @context) ->
        @utils = new Utils
        @mouse = @utils.captureMouse(@canvas)


    setUpAndStart: =>
        @draw()

    draw: =>
        @context.clearRect 0, 0, @canvas.width, @canvas.height



        @rafId = requestAnimationFrame @draw

    tearDown: =>
        window.cancelAnimationFrame @rafId

    canvasResized: (@canvas) =>