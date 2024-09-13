## git的使用
git config --global user.name ''
git config --global user.email ''
一、初始化仓库（暂存区、版本保留区）:git init
二、切换操作分支和GitHub主分支一致: git branch -m master main
三、提交代码到暂存区和保留区:git add .   git commit -m '第一次提交'
四、连接github:git remote add origin 远程仓库git地址
五、将代码提交到GitHub上:git push -u origin main

git branch 分支名 ：创建分支
git checkout 分支名 ：切换分支
git branch:查看所有分支
git log --oneline
git reflog --oneline

git reset --soft HEAD~1  # 回退到上一个提交，保留更改在暂存区
git reset --mixed HEAD~1  # 回退到上一个提交，保留更改在工作树(默认,git add)
git reset --hard HEAD~1  # 回退到上一个提交，丢弃所有更改


`git revert：创建一个新的提交，撤销指定提交的更改，但不会修改提交历史`
git rebase:重新组织提交历史，合并分支。

main:A-B-C-D-E
branch:A-B-C-F-G
在branch分支上执行git rebase main命令
结果：
main:
A---B---C---F---G
branch:
A---B---C---F---G---D'---E'
就是说，在C版本中建立了一个分支，此时主分支和次分支都进行了多次版本更新，现需要就主分支更改的版本应用到次分支上
`当主分支的修改和次分支的修改发生冲突时，就产生了变基冲突，需要手动解决完冲突git add . git rebase --continue`
`冲突解决`：git staus查看冲突状态，git add git commit

git stash 将工作树和暂存区的修改保存到栈中，以便清理工作目录。你可以稍后恢复这些更改。
`用途：临时保存未完成的工作。`
`切换分支或进行其他操作而不丢失当前的工作。`

git config --list查看清单

git pull <远程仓库名> <远程分支名> 拉取远程仓库的分支与本地当前分支合并
git pull <远程仓库名> <远程分支名>:<本地分支名> 拉取远程仓库的分支与本地某个分支合并


`由于GitHub中的代码和工作区的代码不一致，需要将最新的远程代码拉取出来并和本地代码合并，再重新提交`
git pull --rebase origin <branch_name>
git push origin <branch_name>    

git branch 查看本地所有分支
git branch -r 查看远程所有分支
git branch -a 查看本地和远程所有分支

git merge <分支名> 合并分支
git merge --abort 合并分支出现冲突时，取消合并，一切回到合并前的状态

git branch <新分支名> 基于当前分支，新建一个分支
git checkout --orphan <新分支名> 新建一个空分支（会保留之前分支的所有文件）
git branch -D <分支名> 删除本地某个分支

git branch <新分支名称> <提交ID> 从提交历史恢复某个删掉的某个分支
git branch -m <原分支名> <新分支名> 分支更名
git checkout <分支名> 切换到本地某个分支
git checkout <远程库名>/<分支名> 切换到线上某个分支
git checkout -b <新分支名> 把基于当前分支新建分支，并切换为这个分支

git remote -v 显示所有远程仓库

git pull [remote] [branch] 拉取远程仓库的分支与`本地当前分支`合并
`git pull = git fetch + git merge`

`git fetch 获取线上最新版信息记录，不合并,适合在合并前检查冲突问题`

git push [remote] [branch] 上传本地指定分支到远程仓库
git push [remote] --force 强行推送当前分支到远程仓库，即使有冲突
git push [remote] --all 推送所有分支到远程仓库


## 说说Git中 fork, clone,branch这三个概念，有什么区别?
Fork：用于创建一个现有仓库的副本。这个副本会在你的 GitHub 账户下，并且与你原始仓库相互独立。
用途：
1、方便你对一个开源项目进行修改，而不会影响原项目。
2、允许你在修改之后，通过 Pull Request 提交你的改动请求给原项目。
3、常用于开源项目的贡献流程。
举例：
在 GitHub 上，你找到一个有趣的开源项目，你可以点击 Fork 按钮，这会在你的账户下创建这个项目的副本。然后你可以自由地在这个副本上进行修改。

clone：是指将远程仓库复制到本地计算机上。它会创建仓库的一个完整副本，包括所有的历史记录。`可以没有网络？`
Branch 是指在同一个仓库中并行开发的独立工作流。它允许你从主开发线分离出来进行开发，然后可以合并回去。
举例：大项目每一个人负责一个独立的模块，就代表一个分支，将所有分支融合成一个总项目

1、方便你在不影响主线代码的情况下进行新功能的开发、修复 bug 或进行实验。`bug检验，新功能开发`
2、支持多个人员在同一项目中同时进行不同功能的开发。`分工协作`

总结：
Fork 是在远程仓库平台上创建的副本，用于独立的开发和贡献流程，特别适合开源项目。[在自己的仓库创建副本]，不属于git命令，是GitHub的一种操作
Clone 是将远程仓库复制到本地的操作，允许你在本地工作和开发。
Branch 是在同一个仓库中创建的独立工作流，允许并行开发、功能开发和代码隔离。

## 说说Git 中 HEAD、工作树和索引之间的区别？
head:是一个指向你正在`工作中的本地分支的指针`[正在工作的最新提交],但我们在test分支再一次commit信息的时候，HEAD指针仍然指向了test分支指针，而test分支指针已经指向了最新创建的提交,可以理解为指向最新commit提交的版本（哈希值）。可以使用git checkout切换指向分支的方向。
工作树：实际工作区
索引：暂存区，提供更为细致化的开发，每一个git commit之后暂存区的数据都会清除
仓库：本地不同版本的存储仓库，git commit之后的数据将会持久化保存。






