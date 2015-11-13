class Fountain
    constructor:(@canvas, @context) ->
        @utils = new Utils
        @mouse = @utils.captureMouse(@canvas)

        @numBalls = 80
        @gravity = 0.5
        @balls = []

        for num in [0...@numBalls]
            ball = new Ball 2, Math.random() * 0xffffff
            ball.x = @canvas.width / 2
            ball.y = @canvas.height
            ball.vx = Math.random() * 2 - 1
            ball.vy = Math.random() * - 10 - 10
            @balls.push ball


    setUpAndStart: =>
        @draw()


    draw: =>
        @context.clearRect 0, 0, @canvas.width, @canvas.height

        for ball in @balls
            ball.vy += @gravity
            ball.x += ball.vx * 5
            ball.y += ball.vy

            if (ball.x - ball.radius > @canvas.width ||
                ball.x + ball.radius < 0 ||
                ball.y - ball.radius > @canvas.height ||
                ball.y + ball.radius < 0)

                    ball.x = @canvas.width / 2
                    ball.y = @canvas.height
                    ball.vx = Math.random() * 2 - 1
                    ball.vy = Math.random() * - 10 -10

            if (@utils.containsPoint ball.getBounds(), @mouse.x, @mouse.y)
                    ball.radius += 0.5

            ball.draw(@context)

        @rafId = requestAnimationFrame @draw


    tearDown: =>
        window.cancelAnimationFrame @rafId