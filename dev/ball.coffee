class Ball
    constructor:(radius, color, @context) ->
        @utils = new Utils

        if radius is undefined
            radius = 40

        if color is undefined
            color = "#ff0000"

        @x = 0
        @y = 0
        @radius = radius
        @vx = 0
        @vy = 0
        @rotation = 0
        @scaleX = 1
        @scaleY = 1
        @color = @utils.parseColor(color)


    setUpAndStart: =>
        @draw()

    draw: =>
        @context.save()
        @context.translate @x, @y
        @context.rotate @rotation
        @context.scale @scaleX, @scaleY

        @context.fillStyle = @color
        @context.beginPath()
        #x, y, radius, start_angle, end_angle, anti-clockwise
        @context.arc 0, 0, @radius, 0, Math.PI * 2, true
        @context.closePath()
        @context.fill()
        @context.restore()