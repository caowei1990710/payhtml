(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('uploadFile', uploadFile);

    /** @ngInject */
    function uploadFile() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/uploadFile/uploadFile.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=',
                name: '='
            },
            controller: UploadFileController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function UploadFileController($log, $timeout, Upload, uploadFileUrl, imgUrl) {
            var vm = this;

            vm.ngModel;
            vm.ngDisabled;
            vm.name;
            vm.loading = false;
            vm.uploaded = false;

            function uploadFiles(file, errFiles) {
                vm.loading = true;
                vm.f = file;
                vm.errFile = errFiles && errFiles[0];
                if (file) {
                    file.upload = Upload.upload({
                        url: uploadFileUrl,
                        data: {
                            img: file,
                            id: new Date().getTime()
                        }
                    });

                    file.upload.then(function(response) {
                        $timeout(function() {
                            file.result = response.data;
                            if (response.data.data.imgUrl) {
                                vm.ngModel = imgUrl + response.data.data.imgUrl;
                                vm.uploaded = true;
                                vm.loading = false;
                            }
                        });
                    }, function(response) {
                        if (response.status > 0)
                            vm.errorMsg = response.status + ': ' + response.data;

                    }, function(evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                }
            }
            vm.uploadFiles = uploadFiles;
        }
    }

})();
