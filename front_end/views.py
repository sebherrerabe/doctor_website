from django_nextjs.render import render_nextjs_page_async


async def renderIndex(request, slug=None):
    return await render_nextjs_page_async(request)
