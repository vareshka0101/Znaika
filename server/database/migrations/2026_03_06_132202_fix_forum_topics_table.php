<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('forum_topics', function (Blueprint $table) {
            if (!Schema::hasColumn('forum_topics', 'user_id')) {
                $table->foreignId('user_id')->after('id')->constrained()->onDelete('cascade');
            }
            if (!Schema::hasColumn('forum_topics', 'title')) {
                $table->string('title')->after('user_id');
            }
            if (!Schema::hasColumn('forum_topics', 'content')) {
                $table->text('content')->after('title');
            }
            if (!Schema::hasColumn('forum_topics', 'views')) {
                $table->integer('views')->default(0)->after('content');
            }
            if (!Schema::hasColumn('forum_topics', 'is_pinned')) {
                $table->boolean('is_pinned')->default(false)->after('views');
            }
            if (!Schema::hasColumn('forum_topics', 'is_locked')) {
                $table->boolean('is_locked')->default(false)->after('is_pinned');
            }
        });
    }

    public function down() {}
};
