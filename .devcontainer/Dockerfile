# Generic dev container image. Swap the base image or add tooling as your
# project needs (a specific runtime version, a database client, etc.). This
# is deliberately minimal rather than trying to anticipate every stack.
FROM mcr.microsoft.com/devcontainers/typescript-node:22

SHELL ["/bin/bash", "-c"]

USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       jq \
    && npm install -g @anthropic-ai/claude-code \
    && rm -rf /var/lib/apt/lists/*
USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
RUN mkdir -p /home/node/.npm-global
