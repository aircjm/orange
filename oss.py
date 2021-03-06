import toml
import os
import oss2
import sys

conf = toml.loads(open('web/conf/pancake.toml').read())

# 打包admin静态文件。
os.system("cd admin && npm install && npm run build")

# 打包application静态文件。
os.system("cd application && npm install && export PUBLIC_URL=https://cdn.chenjiaming.org/application && npm run build")



allfile = []
curdir = "./application/build"; #os.path.abspath(os.curdir)
def dirlist(path):

    for file in os.listdir(path):
        filepath = os.path.join(path, file)

        if os.path.isdir(filepath):
            dirlist(filepath)
        elif not filepath.endswith("robots.txt"):
            allfile.append(filepath)


dirlist(curdir)



auth = oss2.Auth(conf['OSS']['AccessKeyId'], conf['OSS']['AccessKeySecret'])

bucket = oss2.Bucket(auth, conf['OSS']['EndPoint'], conf['OSS']['Bucket'])

for file in allfile:
    ret = bucket.put_object_from_file(file.replace(curdir, "application"), file)
    print(ret.status, "   ", file)

for file in allfile:
    if file.find('index.html') >= 0 or file.find('manifest.json') >= 0 :
        continue
    os.system('rm -rf ' + file)
    print( os.system('rm -rf ' + file), 'rm -rf ' + file ,)
