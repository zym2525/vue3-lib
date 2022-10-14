# 文件命名规范
总体上来说，组件、组件文件夹采用大驼峰式命名法，其他文件均采用小驼峰式命名法；

## assets命名规范

   assets下模块名采用小驼峰式命名法，svg,font文件采用小驼峰式命名法，icon采用icon-[iconName]-[type].png,不能出现1，2，3，4等命名(如:icon-edit1.png,icon-edit2.png)

```

│   ...
│   ├── assets                      
│   │   ├── home                 
│   │   │    ├── plus.svg
│   │   │    ├── icon-edit.png          
│   │   │    ├── icon-edit-active.png          
│   │   │    ├── icon-nav-list-edit.png 
│   │   │    ├── icon-nav-table-edit.png 
|   |         
│   ...

```

## components命名规范

   components下组件文件夹，组件名均采用大驼峰式命名法

   如有sass文件，该组件的sass文件名应与组件名相同，并采用小驼峰式命名法

```

│   ...
│   ├── components                    
│   │   ├── List              
│   │   │    ├── List.vue 
│   │   │    ├── ListItem.vue
│   │   │    ├── listItem.sass          
│   ...

```

## views命名规范

    views下页面文件夹和组件均采用大驼峰式命名法，页面组件以模块名开头，hooks采用小驼峰式命名法,

```

│   ...
│   ├── views                    
│   │   ├── AccountManage
│   │   │    ├── components
│   │   │    │    ├── AccountListItem.vue
│   │   │    ├── hooks
│   │   │    │    ├── useSelectAccount.ts               
│   │   │    ├── AccountManage.vue 
│   │   │    ├── AccountManageEdit.vue           
│   │   │    ├── AccountManageAdd.vue           
│   ...

```

