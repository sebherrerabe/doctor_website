from django_nextjs.render import render_nextjs_page_async


async def renderIndex(request):
    return await render_nextjs_page_async(request)


async def renderActualites(request, id=None):
    return await render_nextjs_page_async(request)
