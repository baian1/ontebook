# Dockerfile

提供运行环境

```
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

## 指令

1. LABEL  
   在图像上添加标签，以帮助按项目组织图像，记录许可信息，帮助自动化或其他原因。

```
# Set one or more individual labels
LABEL com.example.version="0.0.1-beta"
LABEL vendor1="ACME Incorporated"
```

2. RUN
   命令在构建时执行一次，并作为新层写入到您的 Docker 映像中。常常用于安装一些软件

   - RUN <command> (shell form, the command is run in a shell, which by default is /bin/sh -c on Linux or cmd /S /C on Windows)
   - RUN ["executable", "param1", "param2"] (exec form)

3. CMD 和 ENTRYPOINT
   用于在容器开始的时候，运行一些服务
4. EXPOSE  
   暴露指定接口供外部使用
5. ENV  
   设置环境变量,会生成一个新的层，建议使用 RUN 执行 shell 命令在单个层中全部设置
6. ADD or COPY
   都会创建新的 layer,用于缓存  
   COPY 仅支持将本地文件基本复制到容器中
   ADD 可以添加远程文件,使用 https://
7. VOLUME
   使用实际硬盘空间
8. USER
   sets the user name (or UID) and optionally the user group (or GID) to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow it in the Dockerfile.
9. WORKDIR  
   用来设置 shell 的工作目录  
   提供多个 workdir，如果是相对路径会根据上面的一条 workdir 来处理
10. ARG  
    设置一个变量,可以在 RUN 中读取,与 ENV 类似,他可以被改变
11. HEALTHCHECK  
    容器的健康状况检测
12. SHELL
    可以替换默认的 SHELL 工具

# .dockerignore

用于将不需要的文件排除在构建过程之外

# 减少层数

- 只有说明 RUN，COPY，ADD 创建图层。其他说明创建临时的中间映像，并且不会增加构建的大小。
- 尽可能使用多阶段构建，并且仅将所需的工件复制到最终映像中。这使您可以在中间构建阶段中包含工具和调试信息，而无需增加最终映像的大小。

# 缓存构建

不适用缓存：
在 build 时使用--no-cache=true

缓存基本规则：

- 从已在缓存中的父映像开始，将下一条指令与从该基本映像派生的所有子映像进行比较，以查看是否其中一个是使用完全相同的指令构建的。如果不是，则高速缓存无效，开始使用新的 layer 构建 image
- 在大多数情况下，只需将中的指令 Dockerfile 与子图像之一进行比较就足够了。但是，某些说明需要更多的检查和解释。
- 对于 ADD 和 COPY 指令，将检查图像中文件的内容，并为每个文件计算一个校验和。在这些校验和中不考虑文件的最后修改时间和最后访问时间。在高速缓存查找期间，将校验和与现有映像中的校验和进行比较。如果文件中的任何内容（例如内容和元数据）发生了更改，则缓存将无效。
- 除了 ADD 和 COPY 命令之外，缓存检查不会查看容器中的文件来确定缓存是否匹配。例如，在处理 RUN apt-get -y update 命令时，不检查容器中更新的文件以确定是否存在缓存命中。在这种情况下，仅使用命令字符串本身来查找匹配项。
