FROM starefossen/ruby-node
MAINTAINER Sebastian Deutsch <sebastian.deutsch@9elements.com>
RUN apt-get update && apt-get install -qq -y --no-install-recommends \
      build-essential libpq-dev \
      imagemagick joe nano \
      curl netcat

ENV INSTALL_PATH /app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY Gemfile Gemfile.lock ./
RUN bundle install --binstubs
COPY . .
VOLUME ["$INSTALL_PATH/public"]
