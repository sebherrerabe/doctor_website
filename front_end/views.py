from django_nextjs.render import render_nextjs_page_async


async def index(request):
    return await render_nextjs_page_async(request)

