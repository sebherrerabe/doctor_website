
FROM nginx:alpine

ARG NEXT_ANALYZE
ARG RAILWAY_STATIC_URL
ARG DJANGO_DEBUG
ARG DJANGO_API_HOST
ARG DJANGO_SECRET_KEY
ARG DJANGO_EMAIL_HOST
ARG DJANGO_EMAIL_HOST_PASSWORD
ARG DJANGO_EMAIL_HOST_USER
ARG DJANGO_EMAIL_PORT
ARG DJANGO_EMAIL_USE_TLS

RUN mkdir -p /usr/src/doctor_website

RUN echo "NEXT_ANALYZE=$NEXT_ANALYZE\nRAILWAY_STATIC_URL=$RAILWAY_STATIC_URL\nDJANGO_DEBUG=$DJANGO_DEBUG\nDJANGO_API_HOST=$DJANGO_API_HOST\nDJANGO_SECRET_KEY=$DJANGO_SECRET_KEY\nDJANGO_EMAIL_HOST=$DJANGO_EMAIL_HOST\nDJANGO_EMAIL_HOST_PASSWORD=$DJANGO_EMAIL_HOST_PASSWORD\nDJANGO_EMAIL_HOST_USER=$DJANGO_EMAIL_HOST_USER\nDJANGO_EMAIL_PORT=$DJANGO_EMAIL_PORT\nDJANGO_EMAIL_USE_TLS=$DJANGO_EMAIL_USE_TLS" >> /usr/src/doctor_website/.env

COPY dev /usr/src/doctor_website
COPY gunicorn/config.py /usr/src/gunicorn/config.py

# Copy Nginx config file
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Install Node.js and npm
RUN apk add nodejs npm

RUN apk add --no-cache python3 python3-dev \
    && python3 -m ensurepip --upgrade \
    && pip3 install --upgrade pip setuptools

# Install Python dependencies
RUN pip3 install -r /usr/src/doctor_website/requirements.txt

# Install Next.js dependencies and build
RUN cd /usr/src/doctor_website/front_end && npm install && npm run build


# Start Gunicorn and Next.js
CMD ["sh", "-c", "gunicorn -c /usr/src/gunicorn/config.py doctor_website.wsgi & cd /usr/src/doctor_website/front_end && npm run start & nginx -g 'daemon off;' -c /etc/nginx/nginx.conf"]

