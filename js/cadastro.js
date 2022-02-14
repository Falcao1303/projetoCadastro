
var app = angular.module('ngApplogin', []);

 
    app.controller('CadastroUsuarioController',function($rootScope,$scope,$timeout,$http,$q){
      var vm = $scope;
      var ser = this;
      
      $rootScope.url_backend = "http://localhost:3000/cadastro";
      vm.cadastroTela = cadastroTela;
      vm.cadastrar = cadastrar;
      vm.getRegistros = getRegistros;
      vm.lista = lista;
      vm.alterarUser = alterarUser;
      vm.editar = editar;
      vm.excluirUser = excluirUser;
      vm.verificaLogin = verificaLogin;
      vm.verificaSenha = verificaSenha;
      iniciarController();

      function iniciarController(){
        vm.usuarioModel ={
          usuario: '',
          cpf: '',
          nome: '',
          senha: '',
          email: ''
        };
        
            $rootScope.chamaRequisicaoPOST = function (param, url) {
              return new Promise(function (resolve) {
                  vm.enviarRequisicaoPOST(param, url, $scope, function (response) {
                      resolve(response.data);
                  });
              });
          };

          $rootScope.chamaRequisicaoGET = function (param, url) {
            return new Promise(function (resolve) {
                ser.enviarRequisicaoGET(param, url, $scope, function (response) {
                    resolve(response.data);
                });
            });
        };
        
              ser.enviarRequisicaoGET = function(parametros,url,scope,callback){
                $http({
                    method: 'GET',
                    url: $rootScope.url_backend + url,
                    data:parametros            
                }).then(callback)
                .catch(callback);    
            };

            vm.enviarRequisicaoPOST = function(parametros,url,scope,callback){
              $http({
                  method: 'POST',
                  url: $rootScope.url_backend + url,
                  data:parametros            
              }).then(callback)
              .catch(callback);    
          };
      }

      getRegistros()

      function cadastroTela(){
        $timeout(function () {window.location.pathname = '/cadastro/ficha' });
      }

      function lista(){
        $timeout(function () {window.location.pathname = '/cadastro/lista' });
      }

      async function alterarUser(id){
        vm.mostrarEdicao = true;
        vm.edicaoModel = [];
        vm.edicaoModel = await $rootScope.chamaRequisicaoGET({},'/usuarios/'+id);
          vm.$digest();
      }

      async function editar(){
        var params = this.edicaoModel;
        await $rootScope.chamaRequisicaoPOST({
          params
      },
          '/usuarios/editar/'+this.edicaoModel.id);
          vm.mostrarEdicao = false;
          getRegistros();
      }

      async function cadastrar(){
        var params = vm.usuarioModel;
        await $rootScope.chamaRequisicaoPOST({
          params
      },
          '/usuarios/salvar');
          $timeout(function () {window.location.pathname = '/cadastro/lista' });
      }

      async function excluirUser(id){
        await $rootScope.chamaRequisicaoPOST({},
          '/usuarios/deleta/'+ id);
          getRegistros();
      }


      async function getRegistros(){
        vm.users = [];
        vm.users = await $rootScope.chamaRequisicaoGET({},'/usuarios');
          vm.$digest();
      }


      async function verificaSenha(usuario,password){
        vm.alertPassword = false;
        vm.passwordUser = [];
        vm.passwordUser = await $rootScope.chamaRequisicaoGET({},'/usuarios/verificar/'+ usuario +'/'+ password);
        if(vm.passwordUser === 0){
          vm.alertPassword = true;
        }else{
          $timeout(function () {window.location.pathname = '/cadastro/lista' });
        }

    }

      async function verificaLogin(usuario,password){
        vm.alert = false;
        vm.userRegistered = [];
        vm.userRegistered = await $rootScope.chamaRequisicaoGET({},'/usuarios/verificar/'+ usuario);
        if(vm.userRegistered === 0){
          vm.alert = true;
        }else{
          verificaSenha(usuario,password);
        }
          vm.$digest();
      
      }

        
    });
