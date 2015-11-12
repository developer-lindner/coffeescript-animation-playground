class Line
    constructor:(@canvas, @context) ->
        @utils = new Utils
        @mouse = @utils.captureMouse(@canvas)

        @rect = 
            x: @canvas.width / 2
            y: @canvas.height / 2


    setUpAndStart: =>
        @draw()

    draw: =>
        @context.clearRect 0, 0, @canvas.width, @canvas.height

        dx = @rect.x - @mouse.x
        dy = @rect.y - @mouse.y
        dist = Math.sqrt dx * dx + dy * dy

        @context.fillStyle = '#000000'
        @context.fillRect @rect.x - 2, @rect.y - 2, 4, 4

        @context.beginPath()
        @context.moveTo @rect.x, @rect.y
        @context.lineTo @mouse.x, @mouse.y
        @context.closePath()
        @context.stroke()


        @rafId = requestAnimationFrame @draw

    tearDown: =>
        window.cancelAnimationFrame @rafId

    canvasResized: (@canvas) =>
        @rect = 
            x: @canvas.width / 2
            y: @canvas.height / 2