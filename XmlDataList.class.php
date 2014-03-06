<?php

/**
 * @author Ryan Lund
 * @description Abstract class to allow easy use of simple XML files. 
 * This class will NOT load all the data into memory - making it useful for large XML files.
 * It is unlikely to be perfect, but has worked well in tests so far. Use at your own peril! See readme for usage.
 */

abstract class XmlDataList implements Iterator{
	private $file_reference=null,$current_element=null,$counter=0;
	protected $element_tag,$file_path; //child classes must set these!
	
	/*
	 * Opens the XML File, moves to the first element and waits. 
	 */
	private function startParse(){
		if(!empty($this->element_tag)&&!empty($this->file_path)){
			$this->file_reference= new XMLReader;
			$this->file_reference->open($this->file_path);

			//loop to first selected element!
			while ($this->file_reference->read()&&$this->file_reference->name !==$this->element_tag);
	
		}
		else{
			throw new InvalidPropertyException('Could not open '.get_class($this).' as constructor is missing some data');
		}
	}
	
	public function current (){		
		if($this->current_element instanceof stdClass){
			return $this->current_element;
		}
		else{
			return false;
		}
	}

	public function next (){
		$this->file_reference->next($this->element_tag);
		$this->counter++;
	}
	
	public function rewind (){
		$this->startParse();
		$this->counter=0;
	}
	
	public function key (){
		return $this->counter;
	}

	/*
	 * Checks for further elements. If another element has been found it will return true (allowing foreach to continue). If not, returns false and exists loop
	 */
	
	public function valid (){
		$data=$this->file_reference->readOuterXML();
		
		if(!empty($data)){
			$current_element=new SimpleXMLElement($data);

			if($current_element instanceof SimpleXMLElement){
				$save_element=new stdClass();

				foreach($current_element as $name=>$value){
					$save_element->$name=$this->toCorrectType((string)$value);
				}
				
				$attributes=$current_element->attributes();
				
				//count attributes first?
				foreach($attributes as $name=>$value){
					$save_element->$name=$this->toCorrectType((string)$value);
				}

				$this->current_element=$save_element;

				return true;
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
	}
	
	/*
	 * Will return a numeric string as its correct type. 
	 */
	private function toCorrectType($var){
		if(!empty($var)){
			$int_regex='/^\-?[0-9]*$/';
			$float_regex='/^\-?([0-9]*)\.([0-9]*)$/';
			
			if(is_numeric($var)){
				if(preg_match($int_regex,$var)){
					return (int) $var;
				}
				else if(preg_match($float_regex,$var)){
					return (float) $var;
				}
				else{
					return (string) $var;
				}
			}
			else{
				return (string) $var;
			}
		}
		else{
			return null;
		}
	}
}

//Usually this class is part of my system and logs the error.
//Have included it here for completeness - Use as you wish :)
class InvalidPropertyException extends Exception{}

?>