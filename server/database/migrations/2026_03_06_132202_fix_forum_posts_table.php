<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('forum_posts', function (Blueprint $table) {
            if (!Schema::hasColumn('forum_posts', 'forum_topic_id')) {
                $table->foreignId('forum_topic_id')->after('id')->constrained()->onDelete('cascade');
            }
            if (!Schema::hasColumn('forum_posts', 'user_id')) {
                $table->foreignId('user_id')->after('forum_topic_id')->constrained()->onDelete('cascade');
            }
            if (!Schema::hasColumn('forum_posts', 'content')) {
                $table->text('content')->after('user_id');
            }
        });
    }

    public function down() {}
};
