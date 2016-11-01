
@REM (.css)+|(.js)+|(.html)+|(.png)+|(.gif)+(.jpg)+|(.jpeg)+
set dirp=%CD%
set dirp=%dirp:\=\\%
node index.js "%dirp%\\target" "%dirp%\\source" "%dirp%\\source\\pages-link_xXxXx.txt" "_xXxXx" "main-pages_xXxXx.html"