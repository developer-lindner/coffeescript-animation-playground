$ ->
    canvas = $(".canvas")[0]
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    context = canvas.getContext '2d'

    currentVis = 0

    visuals = [
            id: 0
            name: "Animation 1"
            fn: new Fountain(canvas, context)
        ,
            id: 1
            name: "Animation 2"
            fn: new Line(canvas, context)
    ]


    # Add window.resize event handler
    $(window).on "resize", () ->
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        visuals[currentVis].fn.canvasResized canvas



    form = $(".controls form")
    form.prepend """
    <div class="form-group">
        <select class="form-control"></select>
    </form>
    """


    for visual in visuals
        form.find("select").append "<option value=#{visual.id}>#{visual.name}</option>"

    form.find("select").change (e) ->
        visuals[currentVis].fn.tearDown()
        currentVis = form.find("select").val()
        visuals[currentVis].fn.setUpAndStart()


    visuals[currentVis].fn.setUpAndStart()