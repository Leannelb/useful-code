#Useful Bits and Pieces :)
==========================

Nothing particularly organised will be here. Just bits and pieces people might find useful. Any questions just give me a shout at ryan.s.lund@gmail.com

###XmlDataList

Ok so I wrote this little class to help iterate through simple (but potentially large) XML files without eating all your RAM. It is an abstract class so it is designed to be extended - like this:


```php
class ProductDataFeed extends XmlDataList{
	public function __construct(){
		$this->file_path='products.xml';
                $this->element_tag='product';
	}
}
```

And thats all there is to it. The file_path is the location of your XML file (can also be a url) and the element_tag is the name of the tag which you would like to turn into an element (continue reading if you're confused!). Anyway once you've got your child class ready you simply:

```php
$product_feed=new ProductDataFeed();

foreach($product_feed as $product){
	echo $product->id." = ".$product->name."\n";
}

```

Now as you can probably tell this is only for quite basic XML. An example for this would be:

```xml
<?xml version="1.0" encoding="utf-8"?>
<products>
	<product id="1">
		<name>A product</name>
	</product>
	<product id="2">
		<name>Second product</name>
	</product>
</products>
```

Anyway, i hope this explains it well enough, any questions just drop me a line at ryan.s.lund@gmail.com

-------------------------------------------------------------------------------------------------------

###Date.js
========================

I quickly put together this little addition to javascripts Date object because I missed PHP's date function (and DateTime::format()). To use simply include the file into your html and use like this:

```js
var date=new Date();
var date_string=date.format('d/m/Y H:i:s'); //where d/m/Y H:i:s is the format.
```

Now, I haven't implemented all of the placeholders that are provided in PHP. I will provide a list of unsupported placeholders in the near future and will likely get around to implementing them when I can. 

Anyway, hope this helps someone out there. 
