<?php
/**
* Created by PhpStorm.
* User: chauncey
* Date: 17-12-26
* Time: 下午5:58
*/
use QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Stamp extends CI_Controller
{
  private $font_array = array(
      '汉仪篆书繁',
      '白舟篆古印',
      '方正小篆体',
      '经典繁方篆',
      '新唐简篆体',
      '迷你方篆书',
      '王汉宗印',
      '中國龍金石篆',
      '超世纪细印篆',
      '汉鼎印篆'
  );
  private $result;
  public function __construct()
  {
      parent::__construct();
      $this->load->database();
  }
  public function index(){
    echo '9fDcCE92TH';
  }
  private function check_session(){
    $this->result = LoginService::check();
        if ($this->result['loginState'] === Constants::S_AUTH) {
          return true;
        }else {
          $this->json([
              'title' => '操作失败',
              'content' => "亲～，你好像并未登录呢！"
          ]);
          return false;
      }
  }
  public function idea_list(){
      $result=$this->db->order_by('up', 'DESC')->get('idea');
      $data=json_encode($result->result());
      echo $data;
  }
  public function up(){
    if(!$this->check_session()) return ;
      $idea_id=$this->input->get('idea_id');

      $query=$this->db->get_where('idea_map',array('ideaID'=>$idea_id,'userID'=>$this->result['userinfo']['openId']));
      if(count($query->result_array()) == 0){
          $data = array('ideaID'=>$idea_id,'userID'=>$this->result['userinfo']['openId']);
          $this->db->insert('idea_map', $data);
          $sql="update idea set up=up+1 where ideaID='$idea_id'";
          $this->db->query($sql);
          $this->json([
              'title' => '投票成功',
              'content' => "谢谢你对软件的支持"
          ]);
      }else{
        $this->json([
              'title' => '投票失败',
              'content' => "亲,该建议你已经投过票啦"
          ]);
      }
  }
  public function down(){
    if(!$this->check_session()) return ;
      $idea_id=$this->input->get('idea_id');

      $query=$this->db->get_where('idea_map',array('ideaID'=>$idea_id,'userID'=>$this->result['userinfo']['openId']));
      if(count($query->result_array()) == 0){
          $data = array('ideaID'=>$idea_id,'userID'=>$this->result['userinfo']['openId']);
          $this->db->insert('idea_map', $data);
          $sql="update idea set down=down+1 where ideaID='$idea_id'";
          $this->db->query($sql);
          $this->json([
              'title' => '投票成功',
              'content' => "谢谢你对软件的支持"
          ]);
      }else{
        $this->json([
              'title' => '投票失败',
              'content' => "亲,该建议你已经投过票啦"
          ]);
      }
  }

  public function new_idea()
  {
    if(!$this->check_session()) return ;
      $idea=trim($this->input->get('idea'));
      if(strlen($idea) < 10){
        $this->json([
              'title' => '发送成功,但不符合要求',
              'content' => "亲～，请您详细的描述一下你的意见或建议。不然开发者很难理解你的意思"
          ]);
      }else{
        $num=DB::insert('idea', [
          'content' => $idea,
          'userID' => $this->result['userinfo']['openId'],
          'userName' => $this->result['userinfo']['nickName']
        ]);
        if($num == 1){
          $this->json([
              'title' => '发送成功',
              'content' => $this->result['userinfo']['nickName']."你的内容已在投票区等待投票了"
            ]);
        }else{
          $this->json([
              'title' => '发送失败',
              'content' => "出现意外错误"
            ]);
        }  
      }    
  }
  public function like(){
    if(!$this->check_session()) return ;
    $img_url=$_GET['img_url'];
    $num=DB::insert('img_like', [
          'userID' => $this->result['userinfo']['openId'],
          'img_url' => $img_url
        ]);
    if($num == 1){
          $this->json([
              'title' => '收藏成功',
              'content' => $this->result['userinfo']['nickName']."你收藏的内容可在我的收藏中查看"
            ]);
        }else{
          $this->json([
              'title' => '收藏失败',
              'content' => "出现意外错误"
            ]);
        }
  }
  public function my_like(){
    if(!$this->check_session()) return ;
    $rows = DB::select('img_like', ['img_url'], ['userID' => $this->result['userinfo']['openId']]);
    $this->json([
      'img_url'=> $rows
    ]);
  }
}