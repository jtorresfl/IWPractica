#!/usr/bin/env bash
# Genera los proyectos base de Vue, Angular y React y les aplica el código del laboratorio.
# Uso:  bash setup.sh
set -e
cd "$(dirname "$0")"

echo ">>> Backend"
(cd backend && npm install)

merge() { # merge <carpeta_temporal> <destino>  (NO sobrescribe nuestros archivos)
  cp -rn "$1"/. "$2"/ 2>/dev/null || true
  rm -rf .scaffold
}

echo ">>> Vue"
mkdir -p .scaffold && (cd .scaffold && npm create vue@latest frontend-vue -- --router --eslint)
merge .scaffold/frontend-vue frontend-vue
rm -rf frontend-vue/src/components frontend-vue/src/views/HomeView.vue frontend-vue/src/views/AboutView.vue \
       frontend-vue/src/assets/base.css frontend-vue/src/assets/logo.svg
(cd frontend-vue && npm install && npm install axios)

echo ">>> Angular"
mkdir -p .scaffold && (cd .scaffold && npx --yes @angular/cli@latest new frontend-angular --routing --style=css --skip-git --ssr=false --defaults --skip-install)
merge .scaffold/frontend-angular frontend-angular
rm -f frontend-angular/src/app/app.ts frontend-angular/src/app/app.html frontend-angular/src/app/app.css \
      frontend-angular/src/app/app.spec.ts
(cd frontend-angular && npm install)

echo ">>> React"
mkdir -p .scaffold && (cd .scaffold && npm create vite@latest frontend-react -- --template react --no-interactive)
merge .scaffold/frontend-react frontend-react
rm -f frontend-react/src/App.css
rm -rf frontend-react/src/assets
(cd frontend-react && npm install && npm install axios react-router)

echo
echo "Listo. Para ejecutar (3 terminales distintas):"
echo "  cd backend          && npm run dev       # http://localhost:3000"
echo "  cd frontend-vue     && npm run dev       # http://localhost:5173"
echo "  cd frontend-angular && npx ng serve      # http://localhost:4200"
echo "  cd frontend-react   && npm run dev       # http://localhost:5174 (o el puerto que indique Vite)"
