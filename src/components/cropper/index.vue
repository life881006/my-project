<template>
	
    <div class="cropper">
		<VueCropper
		  ref="cropper"
		  :img="option.img"
		  :outputSize="option.size"
		  :outputType="option.outputType"
		  :info="true"
		  :full="option.full"
		  :canMove="option.canMove"
		  :canMoveBox="option.canMoveBox"
		  :original="option.original"
		  :autoCrop="option.autoCrop"
		  :autoCropWidth="option.autoCropWidth"
		  :autoCropHeight="option.autoCropHeight"
		  :fixedBox="option.fixedBox"
		  @realTime="realTime"
		  @imgLoad="imgLoad"
		></VueCropper>
    </div>
</template>

<script>
	import VueCropper from 'vue-cropper'

	export default {
		name:"cropper1",
		data(){
			return {
				crap: false,
				previews: {},
				lists: [
					{
						img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
					},
					{
						img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
					}
				],
				option: {
					img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg',
					size: 1,
					full: false,
					outputType: 'png',
					canMove: true,
					fixedBox: false,
					original: false,
					canMoveBox: false
				},
				downImg: '#'
			}
		},
		mounted(){
			console.log(this.$refs.cropper);
			this.$refs.cropper.getCropData(data => {
	        this.fileinfo.url = data
	        this.isShowCropper = false

	       //先将显示图片地址清空，防止重复显示
	        this.option.img = ''

	       //将剪裁后base64的图片转化为file格式
	        let file = this.convertBase64UrlToBlob(data)
	        file.name = this.fileUpload.name

	        //将剪裁后的图片执行上传
	        this.uploadFile(file).then(res => {
	          this.form.content = res.file_id    //将上传的文件id赋值给表单from的content
	        })

	      })
		},
		components : {VueCropper},
		methods : {
			changeImg () {
				this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
			},
			startCrop () {
				// start
				this.crap = true
				this.$refs.cropper.startCrop()
			},
			stopCrop () {
				//  stop
				this.crap = false
				this.$refs.cropper.stopCrop()
			},
			clearCrop () {
				// clear
				this.$refs.cropper.clearCrop()
			},
			// 实时预览函数
			realTime (data) {
				this.previews = data
			},
			imgLoad(){

			},
			create(){

			},
			finish (type) {
				// 输出
				var test = window.open('about:blank')
				test.document.body.innerHTML = '图片生成中..'
				if (type === 'blob') {
					this.$refs.cropper.getCropBlob((data) => {
						var test = window.open('')
						test.location.href = window.URL.createObjectURL(data)
					})
				} else {
					this.$refs.cropper.getCropData((data) => {
						test.location.href = data
					})
				}
			},

			down (type) {
				// event.preventDefault()
				// 输出
				if (type === 'blob') {
					this.$refs.cropper.getCropBlob((data) => {
						this.downImg = window.URL.createObjectURL(data)
                        if (window.navigator.msSaveBlob) {
                            var blobObject = new Blob([data]);
                            window.navigator.msSaveBlob(blobObject, 'demo.png');
                        } else {
                            this.$nextTick(()=>{
                                this.$refs.downloadDom.click();
                            })
                        }
					})
				} else {
					this.$refs.cropper.getCropData((data) => {
						this.downImg = data;
                        if (window.navigator.msSaveBlob) {
                            var blobObject = new Blob([data]);
                            window.navigator.msSaveBlob(blobObject, 'demo.png');
                        } else {
                            this.$nextTick(()=>{
                                this.$refs.downloadDom.click();
                            })
                        }
					})
				}
			},

			uploadImg (e, num) {
				//上传图片
				// this.option.img
				var file = e.target.files[0]
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
					 return false
				 }
				var reader = new FileReader()
				reader.onload = (e) => {
					let data
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
					}
					if (num === 1) {
						this.option.img = data
					} else if (num === 2) {
						this.example2.img = data
					}
				}
				// 转化为base64
				// reader.readAsDataURL(file)
				// 转化为blob
				reader.readAsArrayBuffer(file)
			}
		},
		watch : {
			
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>